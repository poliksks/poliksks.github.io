/*  Все вопросы */
const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option'); //общий id у вопросов

const question = document.getElementById('question'); //сам вопрос

const numberOfQuestion = document.getElementById('number-of-question'), //номер вопроса
    numberOfAllQuestions = document.getElementById('number-of-all-questions'); //кол-во всех вопросов

let indexOfQuestion, //индекс текущего вопроса
    indexOfPage = 0; //индекс страницы

const answersTracker = document.getElementById('answers-tracker'); //обертка для трекера
const btnNext = document.getElementById('btn-next'); //кнопка далее

let score = 0; //итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'), //кол-во правильнах ответов
    numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), //кол-во всех вопрос в модальном окне
    btnTryAgain = document.getElementById('btn-try-again'); //кнопка начать викторину заново

const questions = [{
        question: 'Flexbox используют для ...',
        options: [
            'гибкой вёрстки',
            'корректного отображения элементов',
            'фиксированной вёрстки',
            'программирования на стороне клиента',
        ],
        rightAnswer: 0
    },

    {
        question: 'Элементы выравниваются по нижнему краю контейнера',
        options: [
            'align-items:flex-start',
            'align-items:flex-end',
            'align-items:baseline',
            'flex-direction:column',
        ],
        rightAnswer: 1
    }, 
    {
        question: 'Элементы выравниваются по верхнему краю контейнера',
        options: [
            'align-items:flex-start',
            'align-items:flex-end',
            'justify-content:space-between',
            'align-content:center',
        ],
        rightAnswer: 0
    },
    {
    question: 'Элементы растягиваются, чтобы заполнить контейнер',
    options: [
        'flex-direction:row-reverse',
        'flex-direction:column',
        'align-items:stretch',
        'flex-direction:column-reverse',
        '',
    ],
    rightAnswer: 2
},
{
    question: 'Что позволяет удобно управлять расположением, потрядком, размерами и отступами между элементами веб-страниц?',
    options: [
        'flexqox',
        'flexbox',
        'boxreverse',
        'кошачья лапка',
    ],
    rightAnswer: 1
},
{
    question: 'display:flex',
    options: [
        'делает все дочерние элементы фиксированными',
        'вставляет картинку в текст',
        'делает все дочерние элементы резиновыми',
        'располагает элементы в обратном порядке',
    ],
    rightAnswer: 2
},
{
    question: 'Элементы располагаются по направлению текста',
    options: [
        'align-items:flex-end',
        'flex-direction:column',
        'display:flex',
        'flex-direction:row',
    ],
    rightAnswer:3 
},
{
    question: 'Элементы отображаются в обратном порядке по направлению текста',
    options: [
        'align-items:flex-end',
        'flex-direction:column',
        'justify-content:flex-start',
        'flex-direction:row-reverse',
    ],
    rightAnswer:3 
},
{
    question: 'Элементы располагаются сверху вниз',
    options: [
        'flex-direction:colum',
        'justify-content: space-around',
        'align-items:stretch',
        'flex-direction:row-reverse',
    ],
    rightAnswer:0 
},
{
    question: 'Элементы располагаются по левой стороне контейнера',
    options: [
        'justify-content:center',
        'justify-content: flex-end',
        'justify-content:flex-start',
        'justify-content:space-around',
    ],
    rightAnswer:2 
},
{
    question: 'Элементы располагаются по правой стороне контейнера',
    options: [
        'justify-content:center',
        'justify-content: flex-end',
        'justify-content:flex-start',
        'justify-content:space-around',
    ],
    rightAnswer:1
},
{
    question: 'Элементы отображаются с одинаковыми отступами вокруг них',
    options: [
        'flex-direction:space-around',
        'justify-content:space-between',
        'justify-content:space-around',
        'align-items:stretch',
    ],
    rightAnswer:2
},
{
    question: 'Элементы выравниваются по центру контейнера',
    options: [
        'flex-direction:center',
        'justify-content:space-between',
        'justify-content:space-around',
        'align-items:stretch',
    ],
    rightAnswer:0
},
];

numberOfAllQuestions.innerHTML = questions.length; //выводим кол-во вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; //сам вопрос

    //мапим ответы
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; //установка номера текущей страницы
    indexOfPage++; //увеличение индекса страницы
};

let completedAnswers = [] //массив для уже заданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; //якорь для проверки одинаковых вопросов

    if (indexOfPage == questions.length) {
        quizOver()
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if (item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate == true) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if (completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
}

const checkAnswer = el => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTrecker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTrecker('wrong');
    }
    disabledOptions();
}

for (option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}

//удаление всех классов со всех ответов
const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
};


const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}



const updateAnswerTrecker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if (!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа');
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length
};

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})