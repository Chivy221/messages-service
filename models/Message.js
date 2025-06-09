const { v4: uuidv4 } = require('uuid');

const MessageSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 }, // добавляем shard key
  from: String,
  to: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});
