const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const messagesRouter = require('./routes/messages');
const { consumeMessages } = require('./services/consumer');
const { sendLog } = require('./utils/logger');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/messages', messagesRouter);

app.get('/health', (, res) => res.json({ status: 'ok' }));
app.get('/metrics', (, res) => res.send('messages_service_total_requests 42'));

mongoose.connect(process.env.MONGO_URL, {
useNewUrlParser: true,
useUnifiedTopology: true,
}).then(() => {
console.log('MongoDB connected');
app.listen(process.env.PORT, () => {
console.log(Messages service running on port ${process.env.PORT});
sendLog('Messages service started');
consumeMessages();
});
}).catch(console.error);
