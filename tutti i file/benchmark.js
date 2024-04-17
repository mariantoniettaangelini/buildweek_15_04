document.addEventListener("DOMContentLoaded", (event) => {
    console.log("ciao");
    startGame();
    select_button();
    procediBtn();
});

const nextButton = document.getElementById('procedi');
const questionElement = document.getElementById('domanda');
const answersButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

function startGame() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5); 
    currentQuestionIndex = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(index));
        answersButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answersButtonsElement.firstChild) {
        answersButtonsElement.removeChild(answersButtonsElement.firstChild);
    }
}

function selectAnswer(selectedIndex) {
}

const questions = [
    {
        question: "Che cosa significa l'acronimo CPU?",
        answers: [
            {text: "Central Processing Unit", correct: true},
            {text: "Central Process Unit", correct: false},
            {text: "Computer Personal Unit", correct: false},
            {text: "Central Processor Unit", correct: false}
        ],
        correctAnswerIndex: 0
    },
    {
        question: "Nel linguaggio Js, quale di queste keywords utilizzeresti in una variabile per assicurarti che non venga modificata?",
        answers: [
            {text: "Static", correct: false},
            {text: "Final", correct: true},
            {text: "Private", correct: false},
            {text: "Public", correct: false}
        ],
        correctAnswerIndex: 1
    },

];

//funzione per selezionare i bottoni delle risposte

function select_button () {
    var bottoni = document.querySelectorAll('.btn');
    bottoni.forEach(function (bottone) {
        bottone.addEventListener('click', function() {
            bottoni.forEach(function(btn) {
                btn.classList.remove('btn_selected');
            });
            bottone.classList.add('btn_selected');
        });
        });
    }

// funzione per pulsante procedi




//js per timer

// Credit: Mateusz Rybczonec

var FULL_DASH_ARRAY = 283;
var WARNING_THRESHOLD = 10;
var ALERT_THRESHOLD = 5;

var COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

var TIME_LIMIT = 60; //tempo limite da riprendere dalla variabile della difficoltà (se la vogliamo fare) e riprendere una volta che arriva a 0
var timePassed = 0;
var timeLeft = TIME_LIMIT;
var timerInterval = 0;
var remainingPathColor = COLOR_CODES.info.color;

document.getElementById("timer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <p class=second_txt>secondi<br>rimanenti</p>
  <span id="base-timer-label" class="base-timer__label">${TIME_LIMIT}</span>
  </div>
`;

startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = timeLeft
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
