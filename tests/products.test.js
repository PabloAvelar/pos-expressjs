const request = require('supertest');
const app = require('../app');
const userToken = require('./userToken');
const { faker } = require('@faker-js/faker');

let test_product_id;
let test_supplier_id;

describe('Products API', () => {
    describe("GET /products", () => {
        test('should respond with a list of all products from the database', async () => {
            const response = await request(app)
                .get('/api/products')
                .set("Authorization", `Bearer ${userToken}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);

            // saving one record to be tested in the following cases
            response_record = response.body;
            test_product_id = response_record[0].customer_id;
            test_supplier_id = response_record[0].supplier_id;
        })

    });

    describe("POST /products", () => {
        test('should insert a new product record to the database', async () => {

            const payload = {
                product_code: faker.commerce.isbn(),
                gen_name: faker.commerce.product(),
                product_name: faker.commerce.productName(),
                o_price: faker.commerce.price({ min: 100, max: 500 }),
                price: faker.commerce.price({ min: 600, max: 13000 }),
                supplier_id: test_supplier_id,
                qty: faker.helpers.rangeToNumber({ min: 10, max: 90 }),
                qty_sold: faker.helpers.rangeToNumber({ min: 10, max: 90 }),
                date_arrival: faker.date.future(),
                onhand_qty: faker.helpers.rangeToNumber({ min: 10, max: 90 })
            }
            const response = await request(app)
                .post('/api/products')

                // Headers
                .set('Authorization', `Bearer ${userToken}`)
                .set('Content-Type', `application/json`)
                .set('Accept', `application/json`)

                .send(payload);

            expect(response.status).toBe(200);
        })
    });

    describe("PUT /products", () => {
        test('should update a product record from the database', async () => {

            const payload = {
                product_id: test_product_id,
                product_code: faker.commerce.isbn(),
                gen_name: faker.commerce.product(),
                product_name: faker.commerce.productName(),
                o_price: faker.commerce.price({ min: 100, max: 500 }),
                price: faker.commerce.price({ min: 600, max: 13000 }),
                supplier_id: test_supplier_id,
                qty: faker.helpers.rangeToNumber({ min: 10, max: 90 }),
                qty_sold: faker.helpers.rangeToNumber({ min: 10, max: 90 }),
                date_arrival: faker.date.future(),
                onhand_qty: faker.helpers.rangeToNumber({ min: 10, max: 90 })
            }
            const response = await request(app)
                .post('/api/products')

                // Headers
                .set('Authorization', `Bearer ${userToken}`)
                .set('Content-Type', `application/json`)
                .set('Accept', `application/json`)

                .send(payload);

            expect(response.status).toBe(200);
        })
    });

    describe("DELETE /products", () => {
        test('should delete a product record from the database', async () => {

            const response = await request(app)
                // Deletes the record with the ID 36
                .delete(`/api/products/${test_product_id}`)

                // Headers
                .set('Authorization', `Bearer ${userToken}`)
                .set('Content-Type', `application/json`)
                .set('Accept', `application/json`)

            expect(response.status).toBe(200);
        })
    })
})
