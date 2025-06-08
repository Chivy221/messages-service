const crypto = require('crypto');
const key = process.env.ENCRYPTION_KEY;

module.exports.encrypt = (text) => {
const cipher = crypto.createCipheriv('aes-128-cbc', key, key.slice(0, 16));
let encrypted = cipher.update(text, 'utf8', 'hex');
encrypted += cipher.final('hex');
return encrypted;
};

module.exports.decrypt = (text) => {
const decipher = crypto.createDecipheriv('aes-128-cbc', key, key.slice(0, 16));
let decrypted = decipher.update(text, 'hex', 'utf8');
decrypted += decipher.final('utf8');
return decrypted;
};
