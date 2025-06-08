const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
sender: String,
recipient: String,
content: String, // encrypted
createdAt: {
type: Date,
default: Date.now
}
});
