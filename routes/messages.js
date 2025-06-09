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
    const saved = await message.save();
    cache.set(`message:${saved._id}`, saved);
    sendLog(`New message from ${from} to ${to}`);
    res.status(201).json({ ...saved.toObject(), content });
  } catch (err) {
    console.error("❌ Failed to save message:", err);
    res.status(500).json({ error: 'Error saving message', details: err.message });
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
