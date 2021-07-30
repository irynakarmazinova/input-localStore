// import throttle from 'lodash.throttle';

// импорты js положено ставить выше css
// если это обычный css (не sass, module и т.д.), то его подключают к js только на время разработки, а так только к html. js не понимает css и если нет парсера любого(webpack или parcel), то такой код упадет.

// константа - константное значение между разными запусками скрипта
// глобальная константа через Upper Case + Kebab Case должна быть или в самом верху, сразу после импортов или вообще в другом файле типа constants.js и в импорте извлекаться(import { STORAGE_KEY } from './constants,js';)
const STORAGE_KEY = 'feedback-message';

const formRef = document.querySelector('.js-feedback-form'); //вся форма
const textareaRef = document.querySelector('.js-feedback-form textarea'); //только текстареа
const nameInputRef = document.querySelector('.js-feedback-form input[name="name"]'); //только инпут для ввода имени
const checkboxRef = document.getElementById('user-choise'); //только чекбокс

const formData = {};

checkboxRef.checked = false;

/*
 * - 1. Остановить(запретить) поведение по умолчанию
 * - 2. Убираем сообщение из хранилища (метод reset - сбрасывает значение всех полей в начальное значение)
 * - 3. Очищаем форму после отправки сообщения (oчищаем localStorage)
 */
function onFormInput(e) {
  e.preventDefault(); //1.
  e.currentTarget.reset(); //2.
  localStorage.removeItem(STORAGE_KEY); //3.
}
formRef.addEventListener('submit', onFormInput);

// когда сложные формы и много полей
// сделать так чтобы сохраняло не только сообщение но и имя, и все в одном обьекте
function onAllFormsInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
formRef.addEventListener('input', throttle(onAllFormsInput, 500));

/*
 * populateTextarea будет вызываться(выполняться) при загрузке страницы
 * - 1. Получаем значение из хранилища
 * - 2. Всегда нужно проверять есть ли что-то в поле ввода. Eсли да, то выполняем код
 * - 3. Если там что-то было, обновляем DOM
 */
function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY)); //1.

  // 2.
  if (savedMessage) {
    nameInputRef.value = savedMessage.name; //3.
    textareaRef.value = savedMessage.message;

    // если у savedMessage есть agreement(тоесть чекбокс выбран) - то выбрать его, а если нет, то не выбирать
    // не правильно делать тринарник без присваивания или без return, здесь правильно
    // savedMessage.agreement ? (checkboxRef.checked = true) : (checkboxRef.checked = false);

    checkboxRef.checked = savedMessage.agreement ? true : false;

    // checkboxRef.checked = !!savedMessage.agreement;
    // checkboxRef.checked = Boolean(savedMessage.agreement);

    // !!savedMessage.agreement === Boolean(savedMessage.agreement);

    // Двойной восклицательный знак - позволяет конвертировать любое выражение в логическое значение. Если выражение, с точки зрения JS, истинно — после обработки его двойным восклицательным знаком будет возвращено true. В противном случае будет возвращено false.
  }
}
populateTextarea();

// что бы не подключать весь lodash, можно использовать функцию throttle
function throttle(func, ms) {
  let isThrottled = false;
  let savedArgs;
  let savedThis;

  function wrapper() {
    if (isThrottled) {
      // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
// --------------------------------------------------------------------------
// простой вариант - без использвания объекта

// const formRef = document.querySelector('.js-feedback-form');
// const textareaRef = document.querySelector('.js-feedback-form textarea');

// константа - константное значение между разными запусками скрипта
// const STORAGE_KEY = 'feedback-message';

// /*
//  * - 1. Остановить(запретить) поведение по умолчанию
//  * - 2. Убираем сообщение из хранилища (метод reset - сбрасывает значение всех полей в начальное значение)
//  * - 3. Очищаем форму после отправки сообщения (oчищаем localStorage)
//  */
// function onFormInput(e) {
//   // имитация отправки формы
//   e.preventDefault(); //1.

//   // console.log('Отправляем форму');

//   // e.currentTarget - это сейчас форма, потому что onFormInput сейчас висит на formRef
//   // нельзя писать this.reset() - в этих методах нельзя надеется на контекст
//   e.currentTarget.reset(); //2.

//   localStorage.removeItem(STORAGE_KEY); //3.
// }
// formRef.addEventListener('submit', onFormInput);

// /*
//  * - 1. Получаем значение(данные) поля textarea при вводе
//  * - 2. Сохраняем его в хранилище
//  * - 3. Можно добавить throttle
//  */
// function onTextareaInput(e) {
//   const message = e.target.value; //1.

//   // const message = e.currentTarget.value; //из-за всплытия буду ошибки, не использовать
//   // console.log(message);

//   localStorage.setItem(STORAGE_KEY, message); //2.
//   //value текстареи - это строка.
//   // т.е. стрингифаить (JSON.stringify(message)) не нужно, стрингифаят только массивы и объекты
// }
// textareaRef.addEventListener('input', throttle(onTextareaInput, 500));

// /*
// //
//  * populateTextarea будет вызываться(выполняться) при загрузке страницы
//  * - 1. Получаем значение из хранилища
//  * - 2. Всегда нужно проверять есть ли что-то в поле ввода. если да, то выполняем код
//  * - 3. Если там что-то было, обновляем DOM
//  */
// function populateTextarea() {
//   const savedMessage = localStorage.getItem(STORAGE_KEY); //1.

//   // 2.
//   if (savedMessage) {
//     // console.log(savedMessage);
//     textareaRef.value = savedMessage; //3.
//   }
// }
// populateTextarea();
