const request = require('supertest');
const app = require('../app');

let produtoId;

describe('Testes /produto' , () => {
    test('POST /produtos com JSON Retorna 201 e JSON', async () => {
        const produto = { nome: 'Laranja', preco: 10.0 };
        const res = await request(app)
            .post('/produtos')
            .send(produto)
            .expect('Content-Type', /json/)
            .expect(201);
        
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('nome', 'Laranja');
        expect(res.body).toHaveProperty('preco', 10.0);
        produtoId = res.body._id;
    });

    test('POST /produtos sem JSON Retorna 422 e JSON' , async () => {
        const res = await request(app)
            .post('/produtos')
            .send({})
            .expect(422);

        expect(res.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
    });

    test('GET /produtos Retorna 200, JSON e Array', async () => {
        const res = await request(app)
            .get('/produtos')
            .expect('Content-Type', /json/)
            .expect(200);
        
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /produtos/:id Retorna 200 e JSON', async () => {
        const res = await request(app)
            .get(`/produtos/${produtoId}`)
            .expect(200);

        expect(res.body).toHaveProperty('_id', produtoId);
        expect(res.body).toHaveProperty('nome', 'Laranja');
        expect(res.body).toHaveProperty('preco', 10.0);
    });

    test('GET /produtos/0 Retorna 400 e JSON', async () => {
    const res = await request(app)
            .get('/produtos/0')
            .expect(400);

        expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
    });

    test('GET /produtos/000000000000000000000000 Retorna 404 e JSON', async () => {
    const res = await request(app)
            .get('/produtos/000000000000000000000000')
            .expect(404);

        expect(res.body).toHaveProperty('msg', 'Produto não encontrado');
    });

    test('PUT /produtos/:id com JSON Retorna 200 e JSON', async () => {
    const updated = { nome: 'Laranja Pera', preco: 18.0 };
    const res = await request(app)
            .put(`/produtos/${produtoId}`)
            .send(updated)
            .expect(200);

        expect(res.body).toHaveProperty('_id', produtoId);
        expect(res.body).toHaveProperty('nome', 'Laranja Pera');
        expect(res.body).toHaveProperty('preco', 18.0);
    });

    test('PUT /produtos/:id sem JSON Retorna 422 e JSON', async () => {
        const res = await request(app)
            .put(`/produtos/${produtoId}`)
            .send({})
            .expect(422);

        expect(res.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
    });

    test('PUT /produtos/0 Retorna 400 e JSON', async () => {
        const res = await request(app)
            .put('/produtos/0')
            .send({ nome: 'Test', preco: 1.0 })
            .expect(400);

        expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
    });

    test('PUT /produtos/000000000000000000000000 Retorna 404 e JSON', async () => {
        const res = await request(app)
            .put('/produtos/000000000000000000000000')
            .send({ nome: 'Test', preco: 1.0 })
            .expect(404);

        expect(res.body).toHaveProperty('msg', 'Produto não encontrado');
    });

    test('DELETE /produtos/:id Retorna 204', async () => {
        const res = await request(app)
            .delete(`/produtos/${produtoId}`)
            .expect(204);
    });

    test('DELETE /produtos/0 Retorna 400 e JSON', async () => {
        const res = await request(app)
            .delete(`/produtos/0`)
            .expect(400);

        expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
    });

    test('DELETE /produtos/000000000000000000000000 Retorna 404 e JSON', async () => {
        const res = await request(app)
            .delete('/produtos/000000000000000000000000')
            .expect(404);

        expect(res.body).toHaveProperty('msg', 'Produto não encontrado');
    });
});