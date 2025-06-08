const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.createHash('sha256').update(process.env.SECRET_KEY).digest();
const iv = crypto.randomBytes(16);

function encrypt(text) {
const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update(text, 'utf-8', 'hex');
encrypted += cipher.final('hex');
return iv.toString('hex') + ':' + encrypted;
}

function decrypt(encryptedText) {
const [ivHex, encrypted] = encryptedText.split(':');
const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
decrypted += decipher.final('utf-8');
return decrypted;
}

module.exports = { encrypt, decrypt };
