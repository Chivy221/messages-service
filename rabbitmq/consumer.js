const amqp = require('amqplib');
const Message = require('../models/Message');
const { encrypt } = require('../utils/crypto');
const logger = require('../utils/logger');

module.exports = async function () {
try {
const conn = await amqp.connect(process.env.RABBITMQ_URL);
const ch = await conn.createChannel();
const queue = 'task_created';
  await ch.assertQueue(queue, { durable: true });
logger.info('Waiting for messages in', queue);

ch.consume(queue, async (msg) => {
  if (msg !== null) {
    const content = JSON.parse(msg.content.toString());
    logger.info('Received task message:', content);

    // Save as notification message
    const dbMessage = new Message({
      sender: 'system',
      recipient: content.assignedTo,
      content: encrypt(`New task assigned: ${content.title}`)
    });

    await dbMessage.save();
    ch.ack(msg);
  }
});

  } catch (err) {
logger.error('RabbitMQ Consumer Error:', err);
}
};
