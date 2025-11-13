const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

let token;
let novoToken;

describe('Autenticação e Endpoints', () => {
  it('GET /produtos sem autenticação deve retornar 401', async () => {
    const res = await request.get('/produtos');
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('msg', 'Não autorizado');
  });

  it('GET /produtos com token inválido retorna 401', async () => {
    const res = await request.get('/produtos').set('authorization', 'Bearer 123456789');
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('msg', 'Token inválido');
  });

  it('POST /usuarios/login retorna token', async () => {
    const res = await request
      .post('/usuarios/login')
      .send({ usuario: 'email@exemplo.com', senha: 'abcd1234' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('GET /produtos com token válido retorna 200', async () => {
    const res = await request.get('/produtos').set('authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /usuarios/renovar retorna novo token', async () => {
    const res = await request
      .post('/usuarios/renovar')
      .set('authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    novoToken = res.body.token;
  });

  it('GET /produtos com novo token retorna 200', async () => {
    const res = await request.get('/produtos').set('authorization', `Bearer ${novoToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
