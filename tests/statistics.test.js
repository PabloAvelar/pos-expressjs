const request = require('supertest');
const app = require('../app');
const userToken = require('./userToken');

describe('statistics API', () => {
    describe("GET /statistics/frequentcustomers", () => {
        test('should respond with a list of the frequent customers', async () => {
            const response = await request(app)
                .get('/api/statistics/frequentcustomers')
                .set("Authorization", `Bearer ${userToken}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);

        })
    });

    describe("GET /statistics/sales", () => {
        test('should respond with a list of the transactions made by dates', async () => {
            const response = await request(app)
                .get('/api/statistics/sales')
                .set("Authorization", `Bearer ${userToken}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        })
    });

    describe("GET /statistics/productssold", () => {
        test('should respond with a list of the products sold', async () => {
            const response = await request(app)
                .get('/api/statistics/productssold')
                .set("Authorization", `Bearer ${userToken}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        })
    });


})
