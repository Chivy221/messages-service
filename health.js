const express = require('express');
const router = express.Router();
router.get('/', (_, res) => res.json({ status: 'ok', timestamp: new Date() }));
module.exports = router;
