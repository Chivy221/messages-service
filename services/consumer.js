const amqp = require('amqplib');
const Message = require('../models/Message');
const { encrypt } = require('../utils/crypto');

async function consumeMessages() {
const conn = await amqp.connect(process.env.RABBITMQ_URL);
const ch = await conn.createChannel();
await ch.assertQueue(process.env.MESSAGE_QUEUE, { durable: false });

ch.consume(process.env.MESSAGE_QUEUE, async msg => {
if (msg !== null) {
const data = JSON.parse(msg.content.toString());
const message = new Message({
from: data.from,
to: data.to,
content: encrypt(data.content)
});
await message.save();
console.log('Message consumed from queue');
ch.ack(msg);
}
});
}

module.exports = { consumeMessages };
