const request = require('supertest');
const app = require('../app');
const userToken = require('./userToken');
const { faker } = require('@faker-js/faker');


describe('clients API', () => {
    describe("GET /clients", () => {
        test('should respond with a list of all clients from the database', async () => {
            const response = await request(app)
                .get('/api/clients')
                .set("Authorization", `Bearer ${userToken}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        })

    });

    describe("POST /clients", () => {
        test('should insert a new customer into the database', async () => {
            const payload = {
                customer_name: faker.person.fullName(),
                address: faker.location.streetAddress(),
                contact: faker.phone.number(),
                membership_number: faker.number.int()
            }
            const response = await request(app)
                .post('/api/clients')

                // Headers
                .set('Authorization', `Bearer ${userToken}`)
                .set('Content-Type', `application/json`)
                .set('Accept', `application/json`)

                .send(payload);

            expect(response.status).toBe(200);
        })
    })
})
