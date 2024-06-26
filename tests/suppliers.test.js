const request = require('supertest');
const app = require('../app');
const userToken = require('./userToken');
const { faker } = require('@faker-js/faker');

let test_supplier_id;

describe('suppliers API', () => {
    describe("GET /suppliers", () => {
        test('should respond with a list of all suppliers from the database', async () => {
            const response = await request(app)
                .get('/api/suppliers')
                .set("Authorization", `Bearer ${userToken}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);

            // saving one record to be tested in the following cases
            response_record = response.body;
            test_supplier_id = response_record[0].supplier_id;

        })

    });

    describe("POST /suppliers", () => {
        test('should insert a new supplier into the database', async () => {
            const payload = {
                supplier_name: faker.person.fullName(),
                supplier_address: faker.location.streetAddress(),
                supplier_contact: faker.string.numeric(10),
                contact_person: faker.string.numeric(10),
                note: faker.word.words()
            }
            const response = await request(app)
                .post('/api/suppliers')

                // Headers
                .set('Authorization', `Bearer ${userToken}`)
                .set('Content-Type', `application/json`)
                .set('Accept', `application/json`)

                .send(payload);
            expect(response.status).toBe(200);
        })
    });

    describe("PUT /suppliers", () => {
        test('should update a supplier record from the database', async () => {

            const payload = {
                supplier_id: test_supplier_id,
                supplier_name: faker.person.fullName(),
                supplier_address: faker.location.streetAddress(),
                supplier_contact: faker.string.numeric(10),
                contact_person: faker.string.numeric(10),
                note: faker.word.words()
            }
            const response = await request(app)
                .put('/api/suppliers')

                // Headers
                .set('Authorization', `Bearer ${userToken}`)
                .set('Content-Type', `application/json`)
                .set('Accept', `application/json`)

                .send(payload);
            expect(response.status).toBe(200);
        })
    });

    describe("DELETE /suppliers", () => {
        test('should delete a supplier record from the database', async () => {

            const response = await request(app)
                // Deletes the record with the ID 36
                .delete(`/api/suppliers/${test_supplier_id}}`)

                // Headers
                .set('Authorization', `Bearer ${userToken}`)
                .set('Content-Type', `application/json`)
                .set('Accept', `application/json`)

            expect(response.status).toBe(200);
        })
    })
})
