const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const messageRoutes = require('./routes/messages');
app.use(express.json());
app.use('/messages', messageRoutes);
app.get('/ping', (_, res) => res.send('pong'));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Message DB connected');
  app.listen(3000, () => console.log('Message service on port 3000'));
}).catch(err => console.error(err));
