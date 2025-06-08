const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const messagesRouter = require('./routes/messages');
const healthRouter = require('./health');
const metricsRouter = require('./metrics');
const connectRabbitMQ = require('./rabbitmq/consumer');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/messages', messagesRouter);
app.use('/health', healthRouter);
app.use('/metrics', metricsRouter);

mongoose.connect(process.env.MONGO_URL, {
useNewUrlParser: true,
useUnifiedTopology: true,
}).then(() => {
console.log('✅ MongoDB connected');
app.listen(process.env.PORT || 3000, () => {
console.log(🚀 Messages service running on port ${process.env.PORT || 3000});
connectRabbitMQ();
});
}).catch(err => console.error('❌ MongoDB error:', err));

module.exports = app;
