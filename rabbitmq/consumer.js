const amqp = require('amqplib');
const Message = require('../models/Message');
const { encrypt } = require('../utils/encryption');
const logger = require('../utils/logger');
const cache = require('../utils/cache');

const queue = 'task_created';

async function connectRabbitMQ() {
try {
const connection = await amqp.connect(process.env.RABBITMQ_URL);
const channel = await connection.createChannel();
await channel.assertQueue(queue, { durable: true });
  console.log(`🟢 [RabbitMQ] Waiting for messages in queue: ${queue}`);
channel.consume(queue, async msg => {
  if (msg !== null) {
    const content = msg.content.toString();
    const payload = JSON.parse(content);
    logger.info(`Received task_created message: ${content}`);

    const messageData = {
      sender: 'task-system',
      receiver: payload.assignedTo || 'unknown',
      content: encrypt(`New task created: ${payload.title}`)
    };

    const message = new Message(messageData);
    await message.save();
    logger.info(`Message created in DB from task info`);

    cache.del('messages');
    channel.ack(msg);
  }
});
  } catch (err) {
console.error('[RabbitMQ] Error:', err);
}
}

module.exports = connectRabbitMQ;
