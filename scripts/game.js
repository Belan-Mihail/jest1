//объект игры
let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    choices: ["button1", "button2", "button3", "button4"],
};

/*
Помните, однако, что наш тест все еще
не пройдет, потому что мы не экспортировали игру и не импортировали ее в наш тестовый файл.
Так что в конце game.js мы добавим наш модуль exports equals фигурных скобок game.
*/

function newGame() {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];

    for (let circle of document.getElementsByClassName("circle")) {
        //проходим циклам по всем кругам - document.getElementsByClassName("circle")
        if (circle.getAttribute("data-listener") !== "true") {
            //если круг НЕ имеет атрибут data-listener со значением true
            circle.addEventListener("click", (e) => {
                //мы подключаем к нему прослушиватель клика
                let move = e.target.getAttribute("id");
                //записываем в переменную айди атрибута с кликом
                lightsOn(move);
                //подсвечиваем этот элемент
                game.playerMoves.push(move);
                //вносим ход игрока в массив
                playerTurn();
                //запускаем функцию 
            });
            circle.setAttribute("data-listener", "true"); //добавляем true к соответсвующему кругу
        }
    }

    showScore();
    addTurn();
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}
//очистка ДОМ от счета 

function addTurn() {
    game.playerMoves = [];
    //очищает ход игрока
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    //случайно выбирает одну из 4 кнопок и добавляет выбранный элемент в массив нового хода
    showTurns();
}
//функция добавляет ход

function lightsOn(circ) {
    document.getElementById(circ).classList.add("light");
    setTimeout(function () {
        document.getElementById(circ).classList.remove("light");
    }, 400);
    //нужно чтобы удалить класс light после его создания - эффект блика
}

function showTurns() {
    game.turnNumber = 0;
    let turns = setInterval(function () { //задает интервал для запуска lightsOn
        lightsOn(game.currentGame[game.turnNumber]); //lightsOn проходит по массиву вариантов
        //согласно элемента номер которого определяет размер значния game.turnNumber
        game.turnNumber++; //увеличивает размер значения game.turnNumber для перехода к следуюющему элементу
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
        }
    }, 800);
}

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns };
//фигурные скобки нужны, так как мы будем экспортировать более одного объекта