document.addEventListener("DOMContentLoaded", (event) => {
    startGame();
    select_button();
    showQuestion();
    startTimer(); 
});

  const questionElement = document.getElementById('domanda');
  const answersButtonsElement = document.getElementById('answer-buttons');
  const nextButton = document.getElementById('procedi');
  const questionCounter = document.getElementById('questionCounter');  // Riferimento all'elemento del numero della domanda
  const proseguiButton = document.getElementById('prosegui');
  let selectedAnswerIndex;
  let shuffledQuestions, currentQuestionIndex, quizCompleted;
  var correctAnswers;
  var contatore = 0;
  const risposteGiuste = [];

  for (let i = 0; i < 10; i++) {risposteGiuste[i] = false}; 
  function calcolaRisposteEsatte() {
     contatore = 0;
     for (let n = 0; n < 10; n++) {
        if (risposteGiuste[n]) {contatore = contatore + 1;}}
     return contatore;
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
    {
        question: "Quale linguaggio di programmazione è utilizzato principalmente per il design web?",
        answers: [
            {text: "Python", correct: false},
            {text: "JavaScript", correct: false},
            {text: "HTML/CSS", correct: true},
            {text: "Java", correct: false}
        ],
        correctAnswerIndex: 2
    },
    {
        question: "Chi è considerato il padre del computer?",
        answers: [
            {text: "Alan Turing", correct: false},
            {text: "Charles Babbage", correct: true},
            {text: "Tim Berners-Lee", correct: false},
            {text: "Bill Gates", correct: false}
        ],
        correctAnswerIndex: 1
    },
    {
        question: "Qual è il sistema operativo più utilizzato al mondo per i computer desktop?",
        answers: [
            {text: "Windows", correct: true},
            {text: "Linux", correct: false},
            {text: "macOS", correct: false},
            {text: "Android", correct: false}
        ],
        correctAnswerIndex: 0
    },
    {
        question: "Cosa significa HTML?",
        answers: [
            {text: "HyperText Markup Language", correct: true},
            {text: "High-Level Text Manipulation Language", correct: false},
            {text: "Hyperlink Text Management Language", correct: false},
            {text: "Home Tool Markup Language", correct: false}
        ],
        correctAnswerIndex: 0
    },
    {
        question: "Qual è il simbolo chimico dell'oro?",
        answers: [
            {text: "Ag", correct: false},
            {text: "Au", correct: true},
            {text: "O", correct: false},
            {text: "Cu", correct: false}
        ],
        correctAnswerIndex: 1
    },
    {
        question: "Qual è il pianeta più grande del sistema solare?",
        answers: [
            {text: "Terra", correct: false},
            {text: "Marte", correct: false},
            {text: "Giove", correct: true},
            {text: "Venere", correct: false}
        ],
        correctAnswerIndex: 2
    },
    {
        question: "Chi è l'autore di 'Il nome della rosa'?",
        answers: [
            {text: "Umberto Eco", correct: true},
            {text: "Gabriel García Márquez", correct: false},
            {text: "Haruki Murakami", correct: false},
            {text: "Franz Kafka", correct: false}
        ],
        correctAnswerIndex: 0
    },
    {
        question: "Qual è il fiume più lungo del mondo?",
        answers: [
            {text: "Nilo", correct: true},
            {text: "Amazonas", correct: false},
            {text: "Mississippi", correct: false},
            {text: "Yangtze", correct: false}
        ],
        correctAnswerIndex: 0
    }
];

  function startGame() {
      shuffledQuestions = questions.sort(() => Math.random() - 0.5);
      currentQuestionIndex = 0;function setNextQuestion() {
          resetState();
          if (currentQuestionIndex < shuffledQuestions.length) {
              showQuestion(shuffledQuestions[currentQuestionIndex]);
              updateQuestionCounter();
          } else {
              displayResult();
          }
      }
      correctAnswers = 0;
      quizCompleted = false;
      setNextQuestion();
  }

  function setNextQuestion() {
      resetState();
      if (currentQuestionIndex < shuffledQuestions.length) {
          showQuestion(shuffledQuestions[currentQuestionIndex]);
          updateQuestionCounter();
      } else {
          displayResult();
      }
  }
  
  function showQuestion(question) {
      questionElement.innerText = question.question;
      resetState();
      question.answers.forEach((answer, index) => {
          const button = document.createElement('button');
          button.innerText = answer.text;
          button.classList.add('btn');
  
          button.addEventListener('click', () => {
              selectAnswer(index);
          });
          answersButtonsElement.appendChild(button);
      });
  }
  
  
  function select_button() {
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

  function rispostaErrata(){
    currentQuestionIndex++;  // Avanza alla prossima domanda
    setNextQuestion();
    resetState();  // Resetta lo stato per rimuovere la selezione dell'utente
    nextButton.disabled = true;}

  nextButton.addEventListener('click', () => {
      if (quizCompleted || currentQuestionIndex === shuffledQuestions.length - 1) { // Se il quiz è completato o è l'ultima domanda
        calcolaRisposteEsatte();
        sessionStorage.setItem('contatore', contatore);
        window.location.href = './pagina3.html';
      } else {
          rispostaErrata()  
      }
  });

  function selectAnswer(selectedOption) {
      selectedAnswerIndex = selectedOption;  // Salva l'opzione di risposta selezionata dall'utente
      const correctIndex = shuffledQuestions[currentQuestionIndex].correctAnswerIndex;
  
      const isCorrect = selectedOption === correctIndex;
  
      // Rimuove la classe btn_selected da tutti i bottoni
      const buttons = document.querySelectorAll('.btn');
      buttons.forEach(button => {
          button.classList.remove('btn_selected');
      });
  
      // Aggiunge la classe btn_selected al bottone selezionato dall'utente
      const selectedButton = buttons[selectedOption];
      selectedButton.classList.add('btn_selected');
  
      if (isCorrect) {
          risposteGiuste[currentQuestionIndex] = true;
          correctAnswers++;
      }
      else {risposteGiuste[currentQuestionIndex] = false;}
  
      const isLastQuestion = currentQuestionIndex === shuffledQuestions.length - 1;
  
      if (currentQuestionIndex < shuffledQuestions.length - 1) { // Verifica se non è l'ultima domanda
          nextButton.disabled = false;  // Abilita il pulsante "Procedi" per permettere di cambiare risposta
      } else {
          quizCompleted = true;
          nextButton.disabled = false;
      }
  }
  
  function resetState() {
      while (answersButtonsElement.firstChild) {
          answersButtonsElement.removeChild(answersButtonsElement.firstChild);
      }
  }
  
  function displayResult() {
      document.getElementById("result").textContent = `Risultato: ${correctAnswers}/${shuffledQuestions.length}`;
      nextButton.disabled = false;
  }
  
  function updateQuestionCounter() {
      questionCounter.innerHTML = `DOMANDA ${currentQuestionIndex + 1}<span>/${shuffledQuestions.length}</span>`;  // Aggiorna il numero della domanda
  }
  
  document.addEventListener('DOMContentLoaded', () => {
      startGame();
      
      nextButton.addEventListener('click', () => {
          if (quizCompleted) {
              calcolaRisposteEsatte();
              alert(`2Hai completato il quiz con ${correctAnswers} risposte corrette! ${contatore}`);
              sessionStorage.setItem('contatore', contatore);
              window.location.href = './pagina3.html';
          } else {
              setNextQuestion();
              resetTimer();
          }
      });
  });
  
//timer

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
var TIME_LIMIT = 15; //tempo limite
var timePassed = 0;
var timeLeft = TIME_LIMIT;
var timerInterval = 0; 
var remainingPathColor = COLOR_CODES.info.color;


document.getElementById("timer").innerHTML = `
    <div class="base-timer">
        <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g class="base-timer__circle">
                <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                <path id="base-timer-path-remaining" stroke-dasharray="283" class="base-timer__path-remaining ${remainingPathColor}"
                    d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"></path>
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
      document.getElementById("base-timer-label").innerHTML = timeLeft;
      setCircleDasharray();
      setRemainingPathColor(timeLeft);
  
      if (timeLeft === 0) {
        onTimesUp();
        resetTimer();
        rispostaErrata();
        setNextQuestion();
      }
    }, 1000);
 //   if (quizCompleted || currentQuestionIndex === shuffledQuestions.length - 1) { // Se il quiz è completato o è l'ultima domanda
        if (quizCompleted) { // Se il quiz è completato o è l'ultima domanda 
        calcolaRisposteEsatte();
        alert(`3Hai completato il quiz con ${correctAnswers} risposte corrette! ${contatore}`);
        sessionStorage.setItem('contatore', contatore);
        window.location.href = './pagina3.html';
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
 

function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    const pathRemaining = document.getElementById("base-timer-path-remaining");
    pathRemaining.classList.remove(alert.color, warning.color, info.color);
    if (timeLeft <= alert.threshold) {
      pathRemaining.classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      pathRemaining.classList.add(warning.color);
    } else {
      pathRemaining.classList.add(info.color); 
    }
  }

  function resetTimer() {
    onTimesUp();
    timePassed = 0;
    timeLeft = TIME_LIMIT;
    document.getElementById("base-timer-label").textContent = timeLeft;
    const pathRemaining = document.getElementById("base-timer-path-remaining");
    pathRemaining.style.transition = 'none';
    // Resetta il colore del path
    setRemainingPathColor(timeLeft);
    // Resetta l'array di dash per il SVG
    setCircleDasharray();
    setTimeout(() => {
      pathRemaining.style.transition = '';
      }, 0);
    startTimer();
}
