
/**
 * @jest-environment jsdom
 */

const { game } = require("../game");
//импорт game

/*
Мы собираемся добавить функцию beforeAll
и мы собираемся загрузить файл index.html в Jests mock DOM, как мы это делали раньше.
И это установит наш DOM один раз, прежде чем будут запущены все остальные тесты.
Итак, снова мы устанавливаем библиотеку fs, которая является частью стандартной библиотеки узла по умолчанию.
Мы собираемся сказать, пусть содержимое файла равно,
мы собираемся прочитать файл index.html так же, как и раньше, с набором символов utf-8.
Затем мы откроем наш документ.
Запишите в него содержимое файла, исправьте там мою скобку.
Затем закройте документ. И хорошо, чтобы убрать это с дороги в начале,
и хорошо, что вы помните, что этот код будет одинаковым для каждого HTML
файл, который вы хотите загрузить в DOM.
*/

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});


/*
Итак, мы собираемся проверить, содержит ли игровой объект ключ
называется счетом, поэтому ожидайте, что счет будет в игре.
*/

describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    //аналогичная проверка на наличие currentGame как было со score
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    //аналогичная проверка на наличие 
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    //аналогичная проверка на наличие 
    test("choices contain correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
    /*
Последнее, что мы хотим добавить, это то, что наш массив выбора должен содержать
ID четырех кнопок, и мы собираемся использовать этот массив для генерации нашего случайного выбора хода.
*/
});


