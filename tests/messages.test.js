// Мокаем модель Message
jest.mock('../models/Message', () => ({
  create: jest.fn().mockImplementation(async (data) => ({
    _id: 'mockid',
    from: data.from,
    to: data.to,
    content: data.content,
    toObject() { return this; },
  })),
  find: jest.fn().mockResolvedValue([
    {
      _id: 'mockid',
      from: 'alice',
      to: 'bob',
      content: 'Hi Bob!',
      toObject() { return this; },
    },
  ]),
}));

// Мокаем encrypt/decrypt (из utils/crypto.js)
jest.mock('../utils/crypto', () => ({
  encrypt: (str) => str,
  decrypt: (str) => str,
}));

// Мокаем cache (из utils/cache.js)
jest.mock('../utils/cache', () => ({
  set: jest.fn(),
}));

// Мокаем sendLog (из utils/logger.js)
jest.mock('../utils/logger', () => ({
  sendLog: jest.fn(),
}));

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const messagesRouter = require('../routes/messages');

let app;

beforeAll(() => {
  app = express();
  app.use(bodyParser.json());
  app.use('/messages', messagesRouter);
});

describe('Messages API', () => {
  it('POST /messages, then GET /messages finds the posted message (mocked)', async () => {
    // Проверяем POST
    const postRes = await request(app)
      .post('/messages')
      .send({ from: 'alice', to: 'bob', content: 'Hi Bob!' });

    expect(postRes.statusCode).toBe(201);
    expect(postRes.body).toHaveProperty('from', 'alice');
    expect(postRes.body).toHaveProperty('to', 'bob');
    expect(postRes.body).toHaveProperty('content', 'Hi Bob!');

    // Проверяем GET
    const getRes = await request(app).get('/messages');
    expect(getRes.statusCode).toBe(200);
    expect(Array.isArray(getRes.body)).toBe(true);

    const found = getRes.body.find(
      msg =>
        msg.from === 'alice' &&
        msg.to === 'bob' &&
        msg.content === 'Hi Bob!'
    );
    expect(found).toBeTruthy();
  });
});
