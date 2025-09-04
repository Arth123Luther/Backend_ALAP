const calculadora = require('../src/index.js');

describe("Testes da Calculadora", () => {
describe("1 - Somas", () => {
test("2 + 2 = 4", () => {
    expect(calculadora.soma).toBeDefined();
    expect(calculadora.soma(2, 2)).toBe(4);
})

test("2 + 0 = 2", () => {
    expect(calculadora.soma(2, 0)).toBe(2);
})

test("-2 + -2 = -4", () => {
    expect(calculadora.soma(-2, -2)).toBe(-4);
})
})

describe("2 - Subtrações", () => {
test('se a >= b, então a - b >= 0', function(){
    expect(calculadora.subtracao).toBeDefined();
    expect(calculadora.subtracao(2, 1)).toBeGreaterThanOrEqual(0);
    expect(calculadora.subtracao(2, 2)).toBeGreaterThanOrEqual(0);
    expect(calculadora.subtracao(2, -2)).toBeGreaterThanOrEqual(0);
    expect(calculadora.subtracao(-2, -4)).toBeGreaterThanOrEqual(0);
})

test('se a < b, então a - b < 0', function(){
    expect(calculadora.subtracao(-2, 1)).toBeLessThan(0);
    expect(calculadora.subtracao(1, 2)).toBeLessThan(0);
    expect(calculadora.subtracao(-2, -1)).toBeLessThan(0);
})
})

describe("3 - Multiplicações", () => {
test('se a ou b = 0, então a * b = 0', function(){
    expect(calculadora.multiplicacao).toBeDefined();
    expect(calculadora.multiplicacao(5, 0)).toBe(0);
    expect(calculadora.multiplicacao(-5, 0)).toBe(-0);
    expect(calculadora.multiplicacao(0, -1)).toBe(-0);
    expect(calculadora.multiplicacao(0, 2.25)).toBe(0);
})

test('se a & b > 0, então a * b > 0', function(){
    expect(calculadora.multiplicacao(1, 2)).toBeGreaterThan(0);
    expect(calculadora.multiplicacao(2, 1)).toBeGreaterThan(0);
    expect(calculadora.multiplicacao(2, 7)).toBeGreaterThan(0);
})

test('se a ou b < 0, então a * b < 0', function(){
    expect(calculadora.multiplicacao(1, -2)).toBeLessThan(0);
    expect(calculadora.multiplicacao(2, -1)).toBeLessThan(0);
    expect(calculadora.multiplicacao(-2, 7)).toBeLessThan(0);
})

test('se a & b < 0, então a * b > 0', function(){
    expect(calculadora.multiplicacao(-1, -2)).toBeGreaterThan(0);
    expect(calculadora.multiplicacao(-2, -1)).toBeGreaterThan(0);
    expect(calculadora.multiplicacao(-2, -2)).toBeGreaterThan(0);
})
})

describe("4 - Divisões", () => {
test('se b = 0, então Divisao por ZERO', () =>{
    expect(calculadora.divisao).toBeDefined();
    expect(() => calculadora.divisao(2, 0)).toThrow('Divisao por ZERO');
    expect(() => calculadora.divisao(-2, 0)).toThrow('Divisao por ZERO');
})

test('se a = 0, então a / b = 0', () =>{
    expect(calculadora.divisao(0, 1)).toBe(0);
    expect(calculadora.divisao(0, 3)).toBe(0);
    expect(calculadora.divisao(0, -2)).toBe(-0);
})
})
})