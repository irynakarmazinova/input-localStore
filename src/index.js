// импорты js положено ставить выше css
import throttle from 'lodash.throttle';
import './style.css';

const formRef = document.querySelector('.js-feedback-form'); //вся форма
const textareaRef = document.querySelector('.js-feedback-form textarea'); //только текстареа
const nameInputRef = document.querySelector('.js-feedback-form input[name="name"]'); //только инпут для ввода имени
const checkboxRef = document.getElementById('user-choise'); //только чекбокс

// константа - константное значение между разными запусками скрипта
const STORAGE_KEY = 'feedback-message';

const formData = {};

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
 * - 2. Всегда нужно проверять есть ли что-то в поле ввода. если да, то выполняем код
 * - 3. Если там что-то было, обновляем DOM
 */
function populateTextarea(e) {
  let savedMessage = localStorage.getItem(STORAGE_KEY); //1.

  // 2.
  if (savedMessage) {
    savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

    nameInputRef.value = savedMessage.name;
    textareaRef.value = savedMessage.message; //3.

    if (savedMessage === savedMessage.agreement['on']) {
      checkboxRef.checked = true;
    } else {
      checkboxRef.checked = false;
    }
  }

  // как сделать так, что бы при перезагрузке с локалстораж в имя попало с объекта имя, а в сообщение попало message из объекта
  // как наполнять поля формы из этого объекта без библиотеки вручную
  // сейчас все попадает целым обектом в сообщение
}
populateTextarea();

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
