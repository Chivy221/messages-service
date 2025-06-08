const request = require('supertest');
const express = require('express');
const router = require('../routes/messages');

const app = express();
app.use(express.json());
app.use('/messages', router);

describe('Messages API', () => {
it('should return 201 on POST', async () => {
const res = await request(app).post('/messages').send({
sender: 'Alice',
recipient: 'Bob',
content: 'Hello'
});
expect(res.statusCode).toBe(201);
});

it('should return 200 on GET', async () => {
const res = await request(app).get('/messages');
expect(res.statusCode).toBe(200);
});
});
