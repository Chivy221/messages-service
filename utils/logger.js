const fs = require('fs');
const path = require('path');
const logFile = path.join(__dirname, '..', 'logs.txt');

function log(message) {
const logLine = [${new Date().toISOString()}] ${message}\n;
fs.appendFile(logFile, logLine, err => {
if (err) console.error('Log write error', err);
});
}

module.exports = {
info: log,
error: log
};
