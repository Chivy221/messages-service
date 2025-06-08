const express = require('express');
const Message = require('../models/Message');
const { encrypt, decrypt } = require('../utils/crypto');
const cache = require('../utils/cache');
const { sendLog } = require('../utils/logger');

const router = express.Router();

router.post('/', async (req, res) => {
try {
const { from, to, content } = req.body;
const encrypted = encrypt(content);
const message = new Message({ from, to, content: encrypted });
await message.save();
cache.set(message:${message._id}, message);
sendLog(New message from ${from} to ${to});
res.status(201).json({ ...message.toObject(), content });
} catch (err) {
res.status(500).json({ error: 'Error saving message' });
}
});

router.get('/', async (_, res) => {
try {
const messages = await Message.find();
const decrypted = messages.map(msg => ({
...msg.toObject(),
content: decrypt(msg.content)
}));
res.json(decrypted);
} catch {
res.status(500).json({ error: 'Error retrieving messages' });
}
});

module.exports = router;
