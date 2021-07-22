// PSEUDOCODE ======================================================================

/* 
        1.) When I load the page, I want to be presented with a "START QUIZ" button.
        2.) When that button is pressed, I want to be presented with a series of multiple choice questions about JavaScript and a decrememnting timer.
        3.) When I submit a response, I want to be presented with another question.
        4.) When I submit an INCORRECT response, I want time to be taken away from the timer.
        5.) When the timer hits ZERO or I run out of questions, I want a "GAME OVER" message and to be prompted to enter a name. 
        6.)Name and score will be stored in local storage.
        7.) When I navigate to the "High Scores" page, I want the current stored high score displayed on the page with stored name.
        8.) When the high score is beaten, I want it added to local storage.


        QUESTIONS:
        1.) Which is NOT a data type in JS? (Number, Boolean, String, Float/c)
        2.) Inside which element do we put JavaScript? (<script>/c, <head>, <div>, <li>)
        3.) What are the types of pop-up boxes available in JS? (alert, prompt, confirm, all of the above/c)
        4.) Which method deletes the last element of an array? (pop/c, snap, crackle, push)
        5.) Which operator is used to concatenate two strings? (Dot, Arrow, Comma, Plus/c)

*/

// GLOBAL VARIABLES AND CONSTANTS =====================================================

var startButton = document.getElementById("start-btn");
var questContainDiv = document.getElementById("question-container");
const questions = [
  {
    question: "Which is NOT a data type in JavaScript?",
    answers: [
      { text: "Number", correct: false },
      { text: "Boolean", correct: false },
      { text: "String", correct: false },
      { text: "Float", correct: true },
    ],
  },
  {
    question: "Inside which element do we put JavaScript?",
    answers: [
      { text: "<script>", correct: true },
      { text: "<head>", correct: false },
      { text: "<div>", correct: false },
      { text: "<li>", correct: false },
    ],
  },
  {
    question: "What are the types of pop-up boxes available in JavaScript?",
    answers: [
      { text: "Alert", correct: false },
      { text: "Prompt", correct: false },
      { text: "Confirm", correct: false },
      { text: "All of the above", correct: true },
    ],
  },
  {
    question: "Which method deletes the last element of an array?",
    answers: [
      { text: "snap()", correct: false },
      { text: "pop()", correct: true },
      { text: "crackle()", correct: false },
      { text: "push()", correct: false },
    ],
  },
  {
    question: "Which operator is used to concatenate two strings?",
    answers: [
      { text: "Dot", correct: false },
      { text: "Arrow", correct: false },
      { text: "Plus", correct: true },
      { text: "Comma", correct: false },
    ],
  },
];
var shuffledQuestions, currentQuestionIndex;
var questionElement = document.getElementById("question");
var answerButtonsElement = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next");
// BUTTONS ============================================================================

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

// GAME FUNCTIONS =====================================================================
function startGame() {
  startButton.classList.add("hide");
  nextButton.classList.remove("hide");
  shuffledQuestions = questions.sort(() => (Math.random = 0.5));
  currentQuestionIndex = 0;
  questContainDiv.classList.remove("hide");
  setNextQuestion();
  countDown();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  if (shuffledQuestions === currentQuestionIndex) {
    return;
  }
}

function showQuestion(questions) {
  questionElement.textContent = questions.question;
  questions.answers.forEach((answers) => {
    const button = document.createElement("button");
    button.textContent = answers.text;
    button.classList.add("btn");
    if (answers.correct) {
      button.dataset.correct = answers.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions > [currentQuestionIndex]) {
    showQuestion(questions);
  } else {
    return;
  }
}

function resetState() {
  clearStatusClass(document.body);
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

//add timer increment and decrement on right or wrong answer
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    secondsLeft - 10;
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

// TIMER FUNCTIONS ====================================================================
var timeEl = document.getElementById("time");
var scoreEl = document.getElementById("last-high-score");
function countDown() {
  var secondsLeft = 60;

  var timeInterval = setInterval(function () {
    if (secondsLeft > 1) {
      timeEl.textContent = secondsLeft + " seconds remaining!";
      secondsLeft--;
    } else if (secondsLeft === 1) {
      timeEl.textContent = secondsLeft + " second remaining!";
    } else {
      timeEl.textContent = "Time's Up!";
      clearInterval(timeInterval);
    }
  }, 1000);
}
