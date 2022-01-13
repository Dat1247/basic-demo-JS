const quizData = [{
        question: 'How old is Florin?',
        a: '10',
        b: '17',
        c: '26',
        d: '110',
        correct: 'c',
    },
    {
        question: 'What is the best programming language in 2019?',
        a: 'Java',
        b: 'C',
        c: 'Python',
        d: 'Javascript',
        correct: 'd',
    }, {
        question: 'Who is he President of US in 2020?',
        a: 'Florin Pop',
        b: 'Donald Trump',
        c: 'Ivan Saldano',
        d: 'Mihai Andrei',
        correct: 'b',
    }, {
        question: 'What does HTML stand for?',
        a: 'Hypertext Markup Language',
        b: 'Cascading Style Sheet',
        c: 'Jason Object Notation',
        d: 'Helicopter Terminals Motorboats Lamborgini',
        correct: 'a',
    }, {
        question: 'What year was JavaScript launched?',
        a: '1996',
        b: '1995',
        c: '1994',
        d: 'none of the above',
        correct: 'b'
    }
];

const question = document.getElementById('question');
const quiz = document.getElementById('quiz');
const aText = document.getElementById('a_text');
const bText = document.getElementById('b_text');
const cText = document.getElementById('c_text');
const dText = document.getElementById('d_text');
const sub = document.getElementById('submit');
const answerEls = document.querySelectorAll('.answer');


let currentQuestion = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswer();
    const currentQuiz = quizData[currentQuestion];
    question.innerText = currentQuiz.question;
    aText.innerText = currentQuiz.a;
    bText.innerText = currentQuiz.b;
    cText.innerText = currentQuiz.c;
    dText.innerText = currentQuiz.d;

}

function getSeleted() {
    let answer = undefined;
    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    })
    return answer;
}

function deselectAnswer() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    })
}

sub.addEventListener("click", () => {
    const answer = getSeleted();
    if (answer) {
        if (answer === quizData[currentQuestion].correct) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `<h2>You answered correctly at ${score}/${quizData.length} questions.</h2>
                <button onclick="location.reload()">Reload</button>
            `;
        }
    }
})