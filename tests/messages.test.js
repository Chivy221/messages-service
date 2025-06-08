const request = require('supertest');
const express = require('express');
const router = require('../routes/messages');

const app = express();
app.use(express.json());
app.use('/messages', router);

describe('Messages API', () => {
it('GET /messages', async () => {
const res = await request(app).get('/messages');
expect(res.statusCode).toBe(200);
});

it('POST /messages', async () => {
const res = await request(app)
.post('/messages')
.send({ from: 'alice', to: 'bob', content: 'Hello Bob!' });
expect(res.statusCode).toBe(201);
});
});
