const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { encrypt, decrypt } = require('../utils/crypto');
const cache = require('../utils/cache');

router.post('/', async (req, res) => {
try {
const { sender, recipient, content } = req.body;
const message = new Message({
sender,
recipient,
content: encrypt(content)
});
await message.save();
cache.del('messages');
res.status(201).json({ ...message.toObject(), content });
} catch (err) {
res.status(500).json({ error: err.message });
}
});

router.get('/', async (_, res) => {
try {
const cached = cache.get('messages');
if (cached) return res.json(cached);
const messages = await Message.find();
const decrypted = messages.map(msg => ({
...msg.toObject(),
content: decrypt(msg.content)
}));
cache.set('messages', decrypted);
res.json(decrypted);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

module.exports = router;
