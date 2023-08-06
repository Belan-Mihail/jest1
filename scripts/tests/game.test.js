
/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn, showTurns } = require("../game");
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
    test("turnNumber key exists", () => {
    expect("turnNumber" in game).toBe(true);
});
});

describe("Newgame works correctly", () => {
    beforeAll(() => {
        /*
        Я хочу использовать другую функцию beforeAll, потому что мы хотим установить
добавьте в состояние игры несколько поддельных значений, чтобы увидеть, сбрасывает ли их новая игровая функция.
        */
       game.score = 42;
       game.currentGame = [1,2,3];
       game.playerMoves = [1,2,3];
       document.getElementById("score").innerText = "42";
       newGame();
    });
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should add one move to the computer's game array", () => {
        expect(game.currentGame.length).toBe(1);
    }); 
    //заменили тест так как добавляем функцию которая добавляет один ход
    test("should set game playerMoves to empty massive", () => {
        expect(game.playerMoves.length).toEqual(0);
    });
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    //очистка ДОМ от счета
    test("expect data-listener to be true", () => {
        newGame();
        const elements = document.getElementsByClassName("circle");
        //собираем все круги в одну переменную
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
            //проходим по всем кругам (с атрибутами data-listener) и проверяем на true
        }
    }); 
})

describe("gameplay works correctly", () => {
    beforeEach(() => {
/*
beforeAll запускается перед всеми тестами,
beforeEach запускается перед запуском каждого теста, поэтому мы будем каждый раз сбрасывать состояние.
*/  
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    addTurn();
    });
    /*
    Еще одна полезная функция — afterEach. Наши тесты изменят игру
state, но мы знаем, что по принципу RITE наш тест должен быть изолирован. То есть,
их можно запускать в любом порядке, поэтому давайте снова сбрасывать состояние после каждого теста.
    */
    afterEach(() => {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    })
    //чтобы проверить что функция addTurn() правильно мы запустим ее еще раз. Первый раз
    // мы ее запускаем в блоке beforeEach и она должна добавлять один ход в массив
    // таким образом если функция работает правильно при повторном вызове в массиве 
    // должно будет 2 элемента
    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
        //toContain - содержит.  button содержит classList light
    }); 
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns(); //ы собираемся вызвать showTurns, который должен сбросить turnNumber
        expect(game.turnNumber).toBe(0);
        //равен ли теперь turnNumber нулю
    });
})

