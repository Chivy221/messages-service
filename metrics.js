const express = require('express');
const router = express.Router();
router.get('/', (_, res) => {
res.json({
uptime: process.uptime(),
memoryUsage: process.memoryUsage(),
timestamp: Date.now()
});
});
module.exports = router;
