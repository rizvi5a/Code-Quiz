// Quiz logic is built in this file
// First strat quiz and get question functions logic is built
// Variables needed to keep track of quiz state

var currentQIndex=0.;
// Allowed time for quiz is number of questions multiplied by 15 sec
var time = questions.length * 15;
var timerId;
// VARIABLES  to reference  HTML DOM elements

// Acess questions and questions' choices
// from question js files "questions.js"
// variables to keep track of quiz state


// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

// Acess sound effects files from sfx folder
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
  // hide start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // un-hide questions section
  questionsEl.removeAttribute("class");
  console.log(questionsEl)
  // start timer
 // timerId = setInterval(clockTick, 1000);

  // show starting time
  timerEl.textContent = time;
  console.log(timerEl.textContent)
  getQuestion();
}
// Built getQuestion function
function getQuestion() {
  // get current question object from array
  var currentQ = questions[currentQIndex];

  // update title with current question title and get from current question objetc
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQ.title;

  // clear out any old question choices
  choicesEl.innerHTML = "";

  // loop over choices
  // foreach() function list all the the question choices 
  // from the "choices" object of each question  using
  //choiceNode.textContent

  currentQ.choices.forEach(function(choice, i) {
    // create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;


    // display on the page
     choicesEl.appendChild(choiceNode);
     console.log(choiceNode)
  });
}



// user clicks button to start quiz
startBtn.onclick = startQuiz;


