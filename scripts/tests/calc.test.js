
const addition = require("../calc");
/*
Итак, сначала нам нужно импортировать функцию, которую мы тестируем, из файла calc.js.
И мы присваиваем это константе, потому что мы не
хотите, чтобы он случайно каким-то образом был перезаписан.
*/

describe('Calculator', () => {
    describe("Additional function", () => {
        test('should return 42 for 20 + 22', () => {
            expect(addition(20,22)).toBe(42);
        });
        test('should return 73 for 42 + 31', () => {
            expect(addition(42,31)).toBe(73);
        });
    });
    describe("Subtract function", () => {

    });
    describe("Multiply function", () => {

    });
    describe("Divide function", () => {

    });
})