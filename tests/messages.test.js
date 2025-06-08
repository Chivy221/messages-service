const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const bodyParser = require('body-parser');
const { encrypt } = require('../utils/crypto'); 

const Message = require('../models/Message'); 
const messagesRouter = require('../routes/messages'); 

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app = express();
  app.use(bodyParser.json());
  app.use('/messages', messagesRouter);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Message.deleteMany({});
});

describe('Messages API', () => {
  it('GET /messages', async () => {
    await Message.create({ from: 'alice', to: 'bob', content: encrypt('Hello Bob') }); 

    const res = await request(app).get('/messages');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('from', 'alice');
    expect(res.body[0].content).toBe('Hello Bob'); 
  });

  it('POST /messages', async () => {
    const res = await request(app)
      .post('/messages')
      .send({ from: 'alice', to: 'bob', content: 'Hi Bob!' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('from', 'alice');
    expect(res.body.content).toBe('Hi Bob!');

  });
});
