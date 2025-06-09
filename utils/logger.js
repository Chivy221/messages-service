const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../logs.txt');

async function sendLog(message) {
  try {
    const logEntry = `${new Date().toISOString()} ${message}\n`;
    fs.appendFile(logFile, logEntry, err => {
      if (err) console.error('Log error:', err);
    });
  } catch (e) {
    console.error('Log error:', e);
  }
}

module.exports = { sendLog };
