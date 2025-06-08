const request = require('supertest');
const app = require('../index'); // убедитесь, что index.js экспортирует app
describe('Messages API', () => {
it('GET /messages → array', async () => {
const res = await request(app).get('/messages');
expect(res.statusCode).toBe(200);
expect(Array.isArray(res.body)).toBe(true);
});

it('POST /messages → created', async () => {
const res = await request(app)
.post('/messages')
.send({ sender: 'alice', receiver: 'bob', content: 'hello world' });
expect(res.statusCode).toBe(201);
expect(res.body.sender).toBe('alice');
});
});
