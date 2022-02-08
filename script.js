/********************************************************************************************************/
/*------------------- Questions Number DOM Selection  -----------------*/
const questionsSection = document.querySelector(".questions-number");
const questionNumber = document.querySelectorAll('input[type="radio"]');
const startButton = document.querySelector(".start-round");
const warningElement = document.querySelector(".warning");
/********************************************************************************************************/

/********************************************************************************************************/
/*------------------- Counter DOM Selection -----------------*/
const counterSection = document.querySelector(".counter-container");
const counterElement = document.querySelector(".counter-text");
/********************************************************************************************************/

/********************************************************************************************************/
/*------------------- Quiz DOM Selection  -----------------*/
const quizSection = document.getElementById("quiz");
const quizContainer = document.querySelector(".quiz-container");
const rightOrWrongContainer = document.querySelector(".right-wrong-container");
/********************************************************************************************************/

/********************************************************************************************************/
/*------------------- Result DOM Selection  -----------------*/
const resultSection = document.querySelector(".result-container");
const resultScore = document.querySelector(".result-score span");
const resultTime = document.querySelector(".result-time");
const playAgainButton = document.querySelector(".play-again");
/********************************************************************************************************/

let gameScore = 0;
let currentQuestion;
let startTimer;
let endingTimer;
let counter = 3;
let questionsNumber = 0;
let currentQuestionNumber = 0;
let questionsSolved = 0;
let selectedInputTimeElement;
/********************************************************************************************************/
/*------------------- Helper Functions  -----------------*/
function clearChecked() {
  for (let i = 0; i < questionNumber.length; i++) {
    questionNumber[i].parentElement.classList.remove("selected-question");
  }
}

let numberOfQuestionsArray = [];
function changeNumbersBasedOnInputValue(questionsNumber) {
  for (let i = 0; i < questionsNumber; i++) {
    numberOfQuestionsArray.push(i);
  }
}

let quizArray = [];

function randomNumber() {
  return Math.floor(Math.random() * numberOfQuestionsArray.length);
}

function createQuizObject() {
  for (let i = 0; i < numberOfQuestionsArray.length; i++) {
    let firstNumber = numberOfQuestionsArray[randomNumber()];
    let secondNumber = numberOfQuestionsArray[randomNumber()];
    quizArray.push({
      firstNumber,
      secondNumber,
      operationResult: firstNumber * secondNumber,
    });
  }
}

let operationResultArray = [];

function createOperationResultArray() {
  for (let item of quizArray) {
    operationResultArray.push(item.operationResult);
  }
}

function createQuizElement() {
  quizContainer.innerHTML = "";
  for (let i = 0; i < quizArray.length; i++) {
    // Destructure First & Second Number From Quiz Array
    const { firstNumber, secondNumber } = quizArray[i];

    // Create P Element & Add Class To It
    const p = document.createElement("p");
    p.className = "quiz-question";

    // First Number x Second Number = To Random Result From Operation Result Array
    p.textContent = `${firstNumber} x ${secondNumber} = ${
      operationResultArray[randomNumber()]
    } `;
    quizContainer.append(p);
  }
}

function extractCurrentQuestion() {
  while (currentQuestionNumber < questionsNumber) {
    // Extract The Current Quiz Element From Quiz Container Children HTML Collection
    const currentQuizElement = quizContainer.children[currentQuestionNumber];

    currentQuizElement.classList.add("current-question");

    // Extract First Number & Second Number & Result;
    // <p class="quiz-question current-question">0 x 9 = 18 </p>
    const firstNumber = currentQuizElement.textContent.slice(0, 1);
    const secondNumber = currentQuizElement.textContent.slice(4, 5);
    const operationResult = currentQuizElement.textContent.slice(8);

    return { firstNumber, secondNumber, operationResult };
  }
}

function nextQuestion() {
  // Remove Current Question Class
  quizContainer.children[currentQuestionNumber].classList.remove(
    "current-question"
  );

  if (currentQuestionNumber < questionsNumber) {
    currentQuestionNumber++;
  }
  currentQuestion = extractCurrentQuestion();
}

function startQuiz() {
  return new Date().getTime();
}

function endQuiz(startTime) {
  return (new Date().getTime() - startTime) / 1000;
}

function renderResult() {
  // Remove Quiz Section From The Dom
  quizSection.style.height = 0;
  quizSection.classList.add("hide");
  rightOrWrongContainer.classList.add("hide");

  // Add Result Section & Play Again Button
  resultSection.classList.remove("hide");
  playAgainButton.classList.remove("hide");

  endingTimer = endQuiz(startTimer);

  // Update The UI For The Timer & Score
  resultTime.textContent = endingTimer.toFixed(2) + "s";
  resultScore.textContent = gameScore;

  warningElement.style.visibility = "hidden";
  selectedInputTimeElement.textContent = endingTimer.toFixed(2) + "s";
}

function hideResultAndShowQuestions() {
  playAgainButton.classList.add("hide");
  resultSection.classList.add("hide");
  questionsSection.classList.remove("hide");
  startButton.classList.remove("hide");
}

function hideQuestionsAndShowCounter() {
  questionsSection.classList.add("hide");
  startButton.classList.add("hide");
  counterSection.classList.remove("hide");

  // Reset Counter Variable & Update Counter Element To Be Equal to Counter Variable;

  counter = 3;

  counterElement.textContent = counter;
}

function createQuizLogic() {
  setTimeout(() => {
    // Quiz Function Call Order
    // 1) Create Quiz Object
    // 2) Create Operation Result Array
    // 3) Create Quiz Element
    createQuizObject();
    createOperationResultArray();
    createQuizElement();
    // Hide Couner & Show Quiz Section & Hide Start Button & Show Right - Wrong Buttons
    counterSection.classList.add("hide");
    quizSection.classList.remove("hide");

    rightOrWrongContainer.classList.remove("hide");
    // Get Access To The Current Question & Start The Timer

    currentQuestion = extractCurrentQuestion();
    startTimer = startQuiz();
  }, 1000);
}

function counterCountDownLogic() {
  const intervalId = setInterval(() => {
    // Reduce Counter & Change Counter Element To Counter Number

    counter -= 1;
    counterElement.textContent = counter;

    // Stop The Interval & Print Go!
    if (counter === 0) {
      clearInterval(intervalId);
      counterElement.textContent = "GO!";

      // After 1 sec from showing go show quiz section
      createQuizLogic();
    }
  }, 1000);
}

function reset() {
  // Result All Values & Empty Aall The Arrays
  currentQuestionNumber = 0;
  questionsSolved = 0;
  gameScore = 0;
  questionsSolved = 0;
  questionsNumber = 0;

  // Add Height Back TO Quiz Section
  quizSection.style.height = "360px";

  // Resett Quiz Array & Opeartion Result Array & Numbers Array;
  quizArray = [];
  operationResultArray = [];
  numberOfQuestionsArray = [];

  clearChecked();

  // Play Again Logic
  // 1) Add Hide Class To Play Again Button
  // 2) Add Hide Class To Result Section
  // 3) Remove Hide Class From Questions Section
  // 4) Remove Hide Class From Start Button
  hideResultAndShowQuestions();
}

/********************************************************************************************************/

/********************************************************************************************************/
/*------------------- DOM Events  -----------------*/
questionNumber.forEach(function (question) {
  question.addEventListener("click", function (e) {
    // Assign Questions Number To The Selected Raido Input Value;

    questionsNumber = +e.target.value;

    selectedInputTimeElement = e.target.nextElementSibling.children[1];

    // First we remove selected class from all the inputs then add it to the current selected radio
    clearChecked();
    const radioInput = e.target;

    if (radioInput.checked) {
      radioInput.parentElement.classList.add("selected-question");
    }
  });
});

startButton.addEventListener("click", function () {
  changeNumbersBasedOnInputValue(questionsNumber);

  if (questionsNumber === 0) {
    warningElement.style.visibility = "visible";
  } else {
    // Start Logic
    // 1) After Pressing Start Round
    // 2) Add Hide Class To Questions Section
    // 3) Add Hide Class To Start Round Button
    // 4) Remove Hide Class From Counter Section
    hideQuestionsAndShowCounter();

    // Counter Count Down Logic
    // 1) After 1 Sec Subtract 1 From Counter Variable & Update Counter Element
    // 2) If Counter Is 0 Then Stop The Counter & Update Counter Element Text To Be Go!
    // 3) After One Sec From Showing Go Create Quiz And Render Them TO the Screen
    counterCountDownLogic();
  }
});

rightOrWrongContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    const { firstNumber, secondNumber, operationResult } = currentQuestion;
    questionsSolved += 1;

    if (e.target.textContent === "Wrong") {
      if (+firstNumber * +secondNumber !== +operationResult) {
        gameScore += 1;
      }
    }

    if (e.target.textContent === "Right") {
      if (+firstNumber * +secondNumber === +operationResult) {
        gameScore += 1;
      }
    }

    if (questionsSolved === questionsNumber) {
      renderResult();
    } else if (questionsSolved !== questionsNumber) {
      nextQuestion();
    }
  }
});

playAgainButton.addEventListener("click", function () {
  reset();
});
