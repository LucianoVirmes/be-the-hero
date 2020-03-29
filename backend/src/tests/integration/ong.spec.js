const request = require('supertest');
const app = require('../../app');
const connection = require('../../database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });
    
    afterAll(async () => {
        await connection.destroy();
    })

    it("Should be able to create a new ONG", async () => {
        const response = await request(app).post('/ongs').send({
            nome: "TESTE3",
            email: "contatoteste@gmail.com",
            whatsapp: "12345678901",
            cidade: "Xanxere",
            estado: "SC"
        });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
})