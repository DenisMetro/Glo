document.addEventListener('DOMContentLoaded', () => { // отработчик событий, который отслеживает загрузку контента
    'use-strict';  // строгий синтаксис

    const btnOpenModal = document.querySelector('#btnOpenModal'); //1, создать переменную кнопки тест
    const modalBlock = document.querySelector('#modalBlock'); //3, создать переменную модального окна
    const closeModal = document.querySelector('#closeModal'); //5, создать переменную кнопки закрыть
    const questionTitle = document.querySelector('#question'); //12, первый вопрос
    const formAnswers = document.querySelector('#formAnswers'); //14, закомментировать верстку ответа, получить переменную формы ответа
    const burgerBtn = document.getElementById('burger'); //19, кнопка бургера
    burgerBtn.style.display = 'none'; //20, спрятать кнопку бургера 
    const prevButton = document.querySelector('#prev'); //37, кнопки модалки
    const nextButton = document.querySelector('#next');
    const modalDialog = document.querySelector('.modal-dialog'); //43, модальное окно
    const sendButton = document.querySelector('#send'); //59, отправить результат опроса
    const modalTitle = document.querySelector('.modal-title'); //70

     //82
     // Your web app's Firebase configuration
    const firebaseConfig = {
         apiKey: "AIzaSyAlHNtEWOvr1gBHKWv5JofJOZ_HNiHVZzE",
         authDomain: "quizburger-95b6a.firebaseapp.com",
         databaseURL: "https://quizburger-95b6a.firebaseio.com",
         projectId: "quizburger-95b6a",
         storageBucket: "quizburger-95b6a.appspot.com",
         messagingSenderId: "65139640096",
         appId: "1:65139640096:web:7d72c9d0774a56b029f945",
         measurementId: "G-41ZFKDKLCT"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const getData = () => { //75, получение данных с сервера
        formAnswers.innerHTML = `<img src="image/spinner.gif">`;

        nextButton.classList.add('d-none'); //83, скрывать кнопки до получения данных
        prevButton.classList.add('d-none');
        
        setTimeout(() => {
            firebase.database().ref().child('questions').once('value') //81, получить доступ к базе
                .then(snap => playTest(snap.val()));
        }, 500);
    }  
    
    //27, 40 переменная вопроса, массив объектов вопрос-ответы
    /* const questions = [ //77, заменить объект на json-файл
        {
            question: "Какого цвета бургер?",
            answers: [
                {
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Черный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                {
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];   */

    let count = -100; //42, окно наверху
    modalDialog.style.top = count + '%'; //45, убрать задержку

    const animateModal = () => { //41, анимация модального окна
        modalDialog.style.top = count + '%'; //43, окно выплывает сверху
        count += 3;

        if (count < 0) { //46, очистка
            requestAnimationFrame(animateModal); 
        } else {
            count = -100;
        }
    }

    let clientWidth = document.documentElement.clientWidth; //16, переменная появления кнопки бургера

    if (clientWidth < 768) { //24, появление кнопки после перезагрузки страницы
        burgerBtn.style.display = 'flex';
    } else {
        burgerBtn.style.display = 'none';
    }

    window.addEventListener('resize', function () { //17, обработчик события window, отслеживание изменение размера окна
        clientWidth = document.documentElement.clientWidth; //18, переназначение

        if (clientWidth < 768) { //21, если ширина окна меньше 768, показать бургер
            burgerBtn.style.display = 'flex';
        } else {
            burgerBtn.style.display = 'none';
        }
    }); 

    burgerBtn.addEventListener('click', function() { //22, открытие модального окна по клику на бургер
        requestAnimationFrame(animateModal); //44
        burgerBtn.classList.add('active'); //23.1, активация кнопки бургер, добавить active, css
        modalBlock.classList.add('d-block'); //4
        getData(); //10
    });

    btnOpenModal.addEventListener('click', () => { //2, обработка нажатия
        requestAnimationFrame(animateModal); //44
        modalBlock.classList.add('d-block'); //4, добавить класс d-block
        // playTest(); //10, вызов
        getData(); //76, запуск функции по клику
    });

    closeModal.addEventListener('click', () => { //6, обработка нажатия
        modalBlock.classList.remove('d-block'); //7, удалить класс d-block
        burgerBtn.classList.remove('active'); //23.2, закрыть модальное окно бургера, удалить active
    });

    /* Делегирование */
    document.addEventListener('click', function (event) { //25, закрытие модального окна при клике мимо
        if ( //26, получать данные всех элементов, кроме данных внутри модального окна, кнопки и бургера
            !event.target.closest('.modal-dialog') && 
            !event.target.closest('.openModalButton') &&
            !event.target.closest('.burger')
        ) { 
            modalBlock.classList.remove('d-block'); //7
            burgerBtn.classList.remove('active'); //23.2
        }
    }); 

    //80, playTest принимает массив questions
    const playTest = (questions) => { //8, функция запуска тестирования
        
        const obj = {}; //54, варианты ответов
        const finalAnswers = []; //51, переменная для ответов пользователя
        let = numberQuestion = 0; //36, переменная с номером вопроса
        modalTitle.textContent = 'Ответь на вопрос:'; //71, восстановить заголовок при повторном обновлении

        const renderAnswers = (index) => { //29, цикл ответов
            questions[index].answers.forEach((answer) => {//35, замена for на foreach
                const answerItem = document.createElement('div'); //30, создать div при каждой итерации
                
                answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center'); //33, стилизация               
                answerItem.innerHTML = ` 
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src="${answer.url}" alt="burger">
                        <span id="title-burger">${answer.title}</span> 
                    </label>
                `; //31, заполнить блоки
                formAnswers.appendChild(answerItem); //32, встроить блоки в форму
            })
        } //34, перенести в начало playTest

        const renderQuestions = (indexQuestion) => { //9, функция отрисовки вопросов
            formAnswers.innerHTML = ''; //38, очистка предыдущих ответов
            
            if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) { //47, условие отрисовки кнопок next и prev 
                questionTitle.textContent = `${questions[indexQuestion].question}`; //13, 28 меняем текст через переменную
                renderAnswers(indexQuestion);
                nextButton.classList.remove('d-none'); //48, скрыть кнопки
                prevButton.classList.remove('d-none');
                sendButton.classList.add('d-none'); //61
            }
            if (numberQuestion === 0) { //49, условия скрытия кнопки prev. ДЗ
                prevButton.classList.add('d-none');
            }
            
            if (numberQuestion === questions.length) { //50, окно благодарности
                questionTitle.textContent = ''; //69, очищать title
                modalTitle.textContent = '';
                nextButton.classList.add('d-none');
                prevButton.classList.add('d-none');
                sendButton.classList.remove('d-none'); //60 отобразить кнопку Отправить
                
                //62, встроить окно ввода номера телефона
                formAnswers.innerHTML = ` 
                    <div class="form-group">
                        <label for="numberPhone">Введите номер телефона</label>
                        <input type="phone" class="form-control" id="numberPhone" placeholder="+7-999-999-99-99">
                    </div>
                `; 

                const numberPhone = document.querySelector('#numberPhone'); //73, запрет ввода букв
                numberPhone.addEventListener('input', (event) => {
                    event.target.value = event.target.value.replace(/[^0-9+-]/, ''); //74, регулярное выражение
                });
            }

            if (numberQuestion === questions.length + 1) { //67
                formAnswers.textContent = 'Спасибо за пройденный тест. Менеджер скоро свяжется с вами.';
                for(let key in obj) { //68, метод перебора объектов
                    let newObj = {};
                    newObj[key] = obj[key];
                    finalAnswers.push(newObj); //58, заполнить finalAnswers
                }

                sendButton.classList.add('d-none'); //72, удалять send на последней странице

                setTimeout(() => {
                    modalBlock.classList.remove('d-block');
                    burgerBtn.classList.remove('active');
                }, 2000);
            }
        }

        renderQuestions(numberQuestion); //11, вызов рендеринга

        const checkAnswer = () => { //53, функция сбора ответов
            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone'); //55,64 спред оператор, массив данных выбранных элементов формы

            inputs.forEach((input, index) => { //56, перебор массива
                if(numberQuestion >= 0 && numberQuestion <= questions.length -1) {
                    obj[`${index}_${questions[numberQuestion].question}`] = input.value;
                } //57, заполнить объект

                if(numberQuestion === questions.length) { //64, если не вопрос, то имя объекта равно номер телефона
                    obj[`Номер телефона`] = input.value;
                }
            })
        }

        nextButton.onclick = () => { //39, обработчик кнопки Далее
            checkAnswer(); //52, вызов
            numberQuestion++; 
            renderQuestions(numberQuestion);
        }

        prevButton.onclick = () => { //39, обработчик кнопки Назад
            numberQuestion--; 
            renderQuestions(numberQuestion);
        }

        sendButton.onclick = () => { //63, отправить
            numberQuestion++; //65
            renderQuestions(numberQuestion); //66
            checkAnswer();

            firebase //83, сохранение данных в БД
            .database()
            .ref()
            .child('contacts')
            .push(finalAnswers);

            console.log(finalAnswers);
        }
    }
});





