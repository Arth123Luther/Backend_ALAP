const supertest = require('supertest');
const express = require('../app');
const request = supertest(express);
let id = null;
let token = null;

describe('Testes /usuarios', () => {
    test('POST /usuarios com um JSON, deve retornar 201 e JSON', async () => {
        const payload = { email: "usuario@email.com", senha: "abcd1234" };
        const response = await request.post('/usuarios').send(payload);

        expect(response.status).toBe(201);
        expect(response.type).toMatch(/json/);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.email).toBe("usuario@email.com");

        id = response.body._id;
    });

    test('POST /usuarios sem JSON, deve retornar 422 e JSON', async () => {
        const payload = { };
        const response = await request.post('/usuarios').send(payload);

        expect(response.status).toBe(422);
        expect(response.type).toMatch(/json/);
        expect(response.body).toHaveProperty('msg', "Email e Senha são obrigatórios");
    });
});

describe('Testes /usuarios/login', () => {
    test('POST /usuarios/login com JSON, deve retornar 200 e JSON', async () => {
        const payload = { email: "usuario@email.com", senha: "abcd1234" };
        const response = await request.post('/usuarios/login').send(payload);

        expect(response.status).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(response.body).toHaveProperty('token');

        token = response.body.token;
    })

    test('POST /usuarios/login sem JSON, deve retornar 401 e JSON', async () => {
        const payload = { };
        const response = await request.post('/usuarios/login').send(payload);

        expect(response.status).toBe(401);
        expect(response.type).toMatch(/json/);
        expect(response.body).toHaveProperty('msg', "Credenciais inválidas");
    })
});

describe('Testes /usuarios/renovar', () => {
    test('POST /usuarios/renovar no parâmetro com token, deve retornar 200 e JSON', async () => {
        const response = await request.post('/usuarios/renovar').set('authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.type).toMatch(/json/);
        expect(response.body).toHaveProperty('token');
    })

    test('POST /usuarios/renovar no parametro inválido, deve retornar 401 e JSON', async () => {
        const response = await request.post('/usuarios/renovar').set('authorization', 'Bearer 123456789');

        expect(response.status).toBe(401);
        expect(response.type).toMatch(/json/);
        expect(response.body).toHaveProperty('msg', "Token inválido");
    })
});

describe('Testes /usuarios/:id', () => {
    test('DELETE /usuarios/${id} com parametro com token, deve retornar 204 sem conteúdo', async () => {
        const response = await request.delete(`/usuarios/${id}`).set('authorization', `Bearer ${token}`);

        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
    })
});