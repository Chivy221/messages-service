const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const messagesRouter = require('./routes/messages');
const logger = require('./utils/logger');
const consumer = require('./rabbitmq/consumer');

dotenv.config();

const app = express();
app.use(express.json());
app.use('/messages', messagesRouter);

app.get('/ping', (_, res) => res.send('pong'));

// Simple /metrics endpoint
app.get('/metrics', (_, res) => {
res.json({
uptime: process.uptime(),
message: "OK",
timestamp: Date.now()
});
});

mongoose.connect(process.env.MONGO_URL, {
useNewUrlParser: true,
useUnifiedTopology: true
}).then(() => {
logger.info('Connected to MongoDB');
app.listen(process.env.PORT, () =>
logger.info(Messages service running on port ${process.env.PORT})
);
consumer(); // Start RabbitMQ consumer
}).catch(err => logger.error('MongoDB connection error', err));
