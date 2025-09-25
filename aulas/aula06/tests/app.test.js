const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

const url = "/tarefas";

describe("Testes da rota /tarefas", () => {
  let id;

  test("GET / deve retornar 200", async () => {
    const response = await request.get(url);
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).not.toBeNull();
  });

  test("POST / deve retornar 201", async () => {
    const response = await request.post(url).send({
      nome: "Estudar Express",
      concluida: false,
    });
    expect(response.status).toBe(201);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body["id"]).toBeDefined();
    id = response.body["id"];
    expect(response.body["nome"]).toMatch("Estudar Express");
    expect(response.body["concluida"]).toBeFalsy();
  });

  test("GET /id retorna 200", async () => {
    const response = await request.get(`${url}/${id}`);
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body["id"]).toBe(id);
    expect(response.body["nome"]).toMatch("Estudar Express");
    expect(response.body["concluida"]).toBeFalsy();
  });

  test("GET /id retorna 404", async () => {
    const response = await request.get(`${url}/0`);
    expect(response.status).toBe(404);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body["msg"]).toBe("Tarefa não encontrada");
  });

  test("PUT /id retorna 200", async () => {
    const response = await request
      .put(`${url}/${id}`)
      .send({ nome: "Revisar para a P1", concluida: true });
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body["nome"]).toMatch("Revisar para a P1");
    expect(response.body["concluida"]).toBe(true);
  });

  test(" PUT/id retorna 404", async () => {
    const response = await request.put(`${url}/0`);
    expect(response.status).toBe(404);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body["msg"]).toBe("Tarefa não encontrada");
  });
  test(" DELETE/id retorna 204", async () => {
    const response = await request.delete(`${url}/${id}`);
    expect(response.status).toBe(204);
    expect(response.body).toStrictEqual({});
  });
  test(" DELETE/id retorna 404", async () => {
    const response = await request.delete(`${url}/${id}`);
    expect(response.status).toBe(404);
    
  })
});
