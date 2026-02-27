const request = require('supertest');
const app = require('../index'); // Adjust path as necessary

describe('Express API', () => {
    describe('GET /', () => {
        it('should return a welcome message', async () => {
            const res = await request(app).get('/');
            expect(res.statusCode).toEqual(200);
            expect(res.text).toBe('Hello, World! Welcome to the Express API for GCP Demo.');
        });
    });

    describe('GET /api/data', () => {
        it('should return JSON data with a message and timestamp', async () => {
            const res = await request(app).get('/api/data');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('timestamp');
            expect(res.body.message).toBe('This is some sample data.');
        });
    });
}); 