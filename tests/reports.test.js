const request = require('supertest');
const app = require('../app');
const userToken = require('./userToken');

describe('reports API', () => {
    describe("GET /reports", () => {
        test('should respond with a list of all reports from the database', async () => {
            const response = await request(app)
                .get('/api/reports')
                .set("Authorization", `Bearer ${userToken}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);

        })

    });


})
