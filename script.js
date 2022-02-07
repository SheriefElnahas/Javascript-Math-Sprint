const gameQuestions = document.querySelectorAll('input[type="radio"]');
const startRound = document.querySelector(".start-round");
const questionContainer = document.querySelector(".questions-number");

// Counter
const counterContainer = document.querySelector(".counter-container");
const counterElement = document.querySelector(".counter-text");

let counter = 3;

// Quiz
const quizElement = document.getElementById('quiz');
const quizContainer = document.querySelector(".quiz-container");

const rightOrWrongContainer = document.querySelector(".right-wrong-container");



// result
const resultContainer = document.querySelector('.result-container');
const playAgainContainer = document.querySelector('.play-again-container');

const resultScore = document.querySelector('.result-score');
const scoreElement = document.querySelector('.result-score span');
const resultTime = document.querySelector('.result-time');


const playAgainButton = document.querySelector('.play-again');

let startGame = false;
let score = 0;
let question;
let start;


function clearChecked() {
  for (let i = 0; i < gameQuestions.length; i++) {
    gameQuestions[i].parentElement.classList.remove("selected-question");
  }
}

gameQuestions.forEach(function (question) {
  question.addEventListener("click", function (e) {
    clearChecked();
    if (e.target.checked) {
      e.target.parentElement.classList.add("selected-question");
    }
  });
});

startRound.addEventListener("click", function () {
  questionContainer.classList.add("hide");
  counterContainer.classList.remove("hide");

  const intervalId = setInterval(() => {
    counter -= 1;
    counterElement.textContent = counter;
    if (counter === 0) {
      clearInterval(intervalId);
      counterElement.textContent = "GO!";

      setTimeout(() => {
      test();
      counterContainer.classList.add("hide");
      quizElement.classList.remove("hide");


      startRound.classList.add("hide");
      rightOrWrongContainer.classList.remove("hide");
      
      question = initQuiz();
      start =  startTimer();
      }, 1000)

  
 
    }
  }, 1000);
});

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function randomNumber() {
  return Math.floor(Math.random() * numbers.length);
}
let firstNumber;
let secondNumber;

const result = [];

function answers() {
  for (let i = 0; i < numbers.length; i++) {
    firstNumber = numbers[randomNumber()];
    secondNumber = numbers[randomNumber()];
    result.push({
      firstNumber,
      secondNumber,
      answer: firstNumber * secondNumber,
    });
  }
}
answers();

const something = [];
for (let item of result) {
  something.push(item.answer);
}

function test() {
  for (let i = 0; i < result.length; i++) {
    const p = document.createElement("p");
    p.className = "quiz-question";

    p.textContent = `${result[i].firstNumber} x ${result[i].secondNumber} = ${
      something[randomNumber()]
    } `;
    quizContainer.append(p);
  }
}


let current = 0;
let questions = 0;

function nextQuestion() {
  quizContainer.children[current].classList.remove("current-question");
  if (current < 10) {
    current++;
  }
  question = initQuiz();
}


rightOrWrongContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    const {firstNumber , secondNumber , result} = question;
    // console.log(`${firstNumber} x ${secondNumber} = ${result}`);
    questions += 1;

   
    if(e.target.textContent === 'Wrong') {

        if(firstNumber * secondNumber !== result) {
    
            score += 1;
        } else {
          // penalty += 0.5;
        }
    }
    if(e.target.textContent === 'Right') {

        if(+firstNumber * +secondNumber === +result) {

            score += 1;
    
        }  else {
          // penalty += 0.5;
        }
    }

    if(questions === 10) {
        renderResult();
    } else if(questions !== 10) {
      nextQuestion();
    }

  }

});

function initQuiz() {

    while(current < 10) {
      const currentQuiz = quizContainer.children[current];

      currentQuiz.classList.add("current-question");
      const firstNumber = currentQuiz.textContent.slice(0, 1);
      const secondNumber = currentQuiz.textContent.slice(4, 5);
      const result = currentQuiz.textContent.slice(8);
  
      return {firstNumber, secondNumber, result}
    }
   

}

function renderResult() {
  quizElement.style.height = 0;
    quizContainer.classList.add('hide');
    rightOrWrongContainer.classList.add('hide');


    resultContainer.classList.remove('hide');
    playAgainContainer.classList.remove('hide');

    let end = endTimer(start);
    // resultScore.textContent = end.toFixed(2);
    resultTime.textContent = end.toFixed(2) + 's';

    scoreElement.textContent = score;

}

function startTimer() {
  const startingTime = new Date().getTime();
  return startingTime;

}

function endTimer(startTime) {
  return (new Date().getTime() - startTime) / 1000;
}



playAgainButton.addEventListener('click', function() {
    reset();

});


function reset() {
  playAgainContainer.classList.add('hide');
  resultContainer.classList.add('hide');
  questionContainer.classList.remove("hide");
  startRound.classList.remove("hide");

  counter = 3;

}

