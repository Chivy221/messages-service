// ==== RABBITMQ FUNCTIONALITY DISABLED ====

// const amqp = require('amqplib');
// let rabbitChannel = null;

// // Инициализация RabbitMQ (отключено)
// async function initRabbit() {
//   try {
//     const conn = await amqp.connect(process.env.RABBITMQ_URL);
//     rabbitChannel = await conn.createChannel();
//     await rabbitChannel.assertQueue('logs', { durable: false });
//   } catch (err) {
//     console.error('Log error:', err);
//   }
// }

// // Отправка лога в RabbitMQ (отключено)
// function sendLog(message) {
//   if (rabbitChannel) {
//     rabbitChannel.sendToQueue('logs', Buffer.from(message));
//   }
// }

// // Экспорт (отключено)
// module.exports = { initRabbit, sendLog };

// ==== STUBS FOR NO RABBITMQ ====

// Пустая функция инициализации
async function initRabbit() {
  // RabbitMQ отключен
}

// Пустая функция логирования
function sendLog(message) {
  // RabbitMQ logging disabled
}

module.exports = { initRabbit, sendLog };
