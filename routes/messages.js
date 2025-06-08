const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { encrypt, decrypt } = require('../utils/encryption');
const cache = require('../utils/cache');
const logger = require('../utils/logger');

// GET /messages
router.get('/', async (req, res) => {
const cached = cache.get('messages');
if (cached) {
logger.info('Cache hit: /messages');
return res.json(cached);
}

const messages = await Message.find();
const decrypted = messages.map(msg => ({
...msg.toObject(),
content: decrypt(msg.content)
}));

cache.set('messages', decrypted);
logger.info('Fetched messages from DB');
res.json(decrypted);
});

// POST /messages
router.post('/', async (req, res) => {
const { sender, receiver, content } = req.body;
const encryptedContent = encrypt(content);

const newMessage = new Message({ sender, receiver, content: encryptedContent });
await newMessage.save();
logger.info(New message created from ${sender} to ${receiver});
cache.del('messages');
res.status(201).json({ ...newMessage.toObject(), content });
});

module.exports = router;
