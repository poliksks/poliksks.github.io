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
        question: 'Что такое флексбокс?',
        options: [
            'это набор свойств CSS для управления позиционированием объектов',
            'это новый язык программирования',
            'это техника для создания анимации',
            'это вышивка',
        ],
        rightAnswer: 0
    },
       {
        question: 'Какое свойство CSS используется для создания контейнера флексбокса?',
        options: [
            'display: block',
            'display: inline-block',
            'display: flex',
            'это крокодил',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какое свойство CSS задает направление, в котором будут располагаться элементы в флексбоксе?',
        options: [
            'justify-content',
            'flex-wrap ',
            'flex-direction',
            'это селёдка',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какое свойство CSS контролирует выравнивание элементов в флексбоксе по главной оси?',
        options: [
            'align-items',
            'justify-content ',
            'это кувшин',
            'flex-direction',
        ],
        rightAnswer: 1
    }, 
    {
        question: 'Какое свойство CSS позволяет выравнивать элементы по вертикали в флексбокс-контейнере?',
        options: [
            'align-items',
            'это котик',
            'justify-content',
            'align-content',
        ],
        rightAnswer: 0
    },
    {
    question: 'align-items:strech',
    options: [
        'элементы располагаются сверху вниз',
        'элементы располагаются сверху вниз',
        'элементы растягиваются, чтобы заполнить контейнер',
        'элементы располагаются сверху вниз',
        '',
    ],
    rightAnswer: 2
},
{
    question: 'align-items:flex-end',
    options: [
        'элементы располагаются сверху вниз',
        'элементы выравниваются по нижнему краю контейнера',
        'элементы располагаются слева направо',
        'элементы располагаются на юге',
    ],
    rightAnswer: 1
},
{
    question: 'элементы отображаются на базовой линии контейнера',
    options: [
        'display:flex',
        'justify-content:center',
        'align-items:baseline',
        'align-items:fffff',
    ],
    rightAnswer: 2
},
{
    question: 'flex-direction:row-reverse',
    options: [
        'элементы располагаются сверху вниз',
        'элементы отображаются в обратном порядке к направлению текста',
        'элементы располагаются сверху вниз',
        'элементы располагаются сверху вниз',
    ],
    rightAnswer: 1
},
{
    question: 'Какое свойство CSS позволяет располагать элементы внутри флексбокса по центру? ',
    options: [
        'align-items',
        'justify-content',
        'да',
        'align-content',
    ],
    rightAnswer: 1
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