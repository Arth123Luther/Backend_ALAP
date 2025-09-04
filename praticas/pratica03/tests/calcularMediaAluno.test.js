const { calcularMediaAluno } = require('../src/calcularMediaAluno');

describe("Implementação", () => {
test("A função está definida (Possui {})", () =>{
    expect(calcularMediaAluno).toBeDefined();
})
})

describe("Erros", () => {
test("As notas a1 e/ou a2 não foram definidas", () =>{
    expect(() => calcularMediaAluno()).toThrow("Notas a1 ou a2 não informadas!");
})
test('As notas a1 e/ou a2 são números negativos', () => {
    expect(() => calcularMediaAluno(2, -1)).toThrow("Notas a1 ou a2 não podem ser negativas!");
    expect(() => calcularMediaAluno(-2, 5)).toThrow("Notas a1 ou a2 não podem ser negativas!");
})
test('A nota a3 é um número negativo', () => {
    expect(() => calcularMediaAluno(2, 2, -1)).toThrow("Nota a3 não pode ser negativa!");
})
})

describe("Calculos", () => {
test('A nota a3 não foi informada', () => {
    expect(calcularMediaAluno(10,10)).toBeCloseTo(10)
    expect(calcularMediaAluno(7,7)).toBeCloseTo(7)
    expect(calcularMediaAluno(5,9)).toBeCloseTo(7.4)
})
test('A nota a3 foi informada', () => {
    expect(calcularMediaAluno(5,2,10)).toBeCloseTo(8)
    expect(calcularMediaAluno(7,1,8)).toBeCloseTo(7.6)
    expect(calcularMediaAluno(4,5,7)).toBeCloseTo(5.8)
})
})