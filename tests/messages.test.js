const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const messagesRouter = require('../routes/messages');

const app = express();
app.use(express.json());
app.use('/messages', messagesRouter);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Messages API', () => {
  it('GET /messages', async () => {
    const res = await request(app).get('/messages');
    expect(res.statusCode).toBe(200);
  }, 10000);

  it('POST /messages', async () => {
    const res = await request(app)
      .post('/messages')
      .send({ from: 'alice', to: 'bob', content: 'Hello Bob!' });
    expect(res.statusCode).toBe(201);
  }, 10000); 
});
