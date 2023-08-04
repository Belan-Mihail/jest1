/**
 * @jest-environment jsdom
 */

//тестирование срабатывания кнопки добавляющей текст в параграф

const { TestScheduler } = require("jest");
const buttonClick = require("../button");

beforeEach(() => {
    // document.body.innerHTML = "<p id='par'></p>"; 
    //определяет блок HTML кода который подлежит проверке
    
    
    let fs = require("fs"); //Затем мы добавим модуль Node fs.
    // Это модуль обработки файловой системы, встроенный в Node.
    //что позволяет нам открывать файлы для чтения и записи.

    let fileContents = fs.readFileSync("index.html", "utf-8");
    /*
    Итак, теперь мы создали ссылку, давайте используем fs для чтения содержимого нашего HTML-файла.
    и сохраните его в переменной, которую мы называем содержимым файла.
    */
    document.open();
    document.write(fileContents);
    document.close();
})


//непосредственно тест
describe('DOM test', () => {
    test('expects p content to change', () => {
        buttonClick();  //автоматически вызываем клик
        expect(document.getElementById("par")
            .innerHTML).toEqual("You Clicked");  //проверяем содержание параграфа
    })
    /*
    Давайте просто добавим еще один тест
    чтобы подтвердить, что мы действительно читаем содержимое index.html. Мы добавим в тест
    чтобы увидеть, существует ли наш тег <h1>
    */
    test("h1 should exist", () => {
        expect(document.getElementsByTagName("h1").length).toBe(1);
    });

    /*
    Этот тест получает все теги h1 и сохраняет их в специальном массиве. Если h1 существует,
    тогда длина массива будет равна 1. Если бы существовало два тега h1, длина была бы равна двум и так далее.
    */
})