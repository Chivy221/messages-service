const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.post('/', async (req, res) => {
  try {
    const msg = new Message(req.body);
    await msg.save();
    res.status(201).json(msg);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/', async (_, res) => {
  const messages = await Message.find();
  res.json(messages);
});

module.exports = router;
