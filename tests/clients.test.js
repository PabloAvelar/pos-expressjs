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
                contact: faker.string.numeric(10),
                membership_number: faker.number.int()
            }
            const response = await request(app)
                .post('/api/clients')

                // Headers
                .set('Authorization', `Bearer ${userToken}`)
                .set('Content-Type', `application/json`)
                .set('Accept', `application/json`)

                .send(payload);
            console.log("POST PAYLOAD...")
            console.log(payload);
            console.log("*************************")
            expect(response.status).toBe(200);
        })
    });

    describe("PUT /clients", () => {
        test('should update a customer record from the database', async () => {
            const CUSTOMER_ID = 23;

            const payload = {
                customer_id: CUSTOMER_ID,
                customer_name: faker.person.fullName(),
                address: faker.location.streetAddress(),
                contact: faker.string.numeric(10),
                membership_number: faker.number.int()
            }
            const response = await request(app)
                .put('/api/clients')

                // Headers
                .set('Authorization', `Bearer ${userToken}`)
                .set('Content-Type', `application/json`)
                .set('Accept', `application/json`)

                .send(payload);
            console.log("PUT PAYLOAD...")
            console.log(payload);
            console.log("*************************")
            expect(response.status).toBe(200);
        })
    });

    describe("DELETE /clients", () => {
        test('should delete a customer record from the database', async () => {
            const CUSTOMER_ID = 36;

            const response = await request(app)
                // Deletes the record with the ID 36
                .delete(`/api/clients/${CUSTOMER_ID}}`)

                // Headers
                .set('Authorization', `Bearer ${userToken}`)
                .set('Content-Type', `application/json`)
                .set('Accept', `application/json`)

            expect(response.status).toBe(200);
        })
    })
})
