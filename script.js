const gameQuestions = document.querySelectorAll('input[type="radio"]');
const startRound = document.querySelector(".start-round");
const questionContainer = document.querySelector(".game-questions");

// Counter
const counterContainer = document.querySelector(".counter-container");
const counterElement = document.querySelector(".counter");
let counter = 3;

// Quiz
const quizContainer = document.querySelector(".quiz-container");
const rightOrWrongContainer = document.querySelector('.right-wrong-container');

let startGame = false;


function clearChecked() {
  for (let i = 0; i < gameQuestions.length; i++) {
    gameQuestions[i].parentElement.classList.remove("selected");
  }
}

gameQuestions.forEach(function (question) {
  question.addEventListener("click", function (e) {
    clearChecked();
    if (e.target.checked) {
      e.target.parentElement.classList.add("selected");
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
      startGame = true;

      test();
      counterContainer.classList.add('hide');
      quizContainer.classList.remove('hide');
      
      startRound.classList.add('hide');
      rightOrWrongContainer.classList.remove('hide');



    }
  }, 1000);
});



const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

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
          answer: firstNumber * secondNumber
      })
  }
}
answers();

const something = [];
for(let item of result) {
    something.push(item.answer);
}
console.log(something);


function test() {
    for(let i = 0; i < result.length; i++) {
        const p = document.createElement("p");
        p.className = "quiz";
        p.textContent = `${result[i].firstNumber} x ${result[i].secondNumber} = ${something[randomNumber()]} `
        quizContainer.appendChild(p);
        
    }
}

// answers();
// createQuestions();

