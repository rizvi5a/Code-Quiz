// Quiz logic is built in this file
// First strat quiz and get question functions logic is built
// Variables needed to keep track of quiz state

var currentQIndex = 0.;
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
  // foreach() method operate on choices object 
  // Create a button for the each choice node and
  // aqttach an event listner to each choice  (questionClick ) function
  //choiceNode.textContent

  currentQ.choices.forEach(function (choice, i) {
    // create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    choiceNode.onclick = questionClick;
    // display on the page
    choicesEl.appendChild(choiceNode);
    console.log(choiceNode)
  });
}
 // function questionClick is used to check user answer
 // display correct or wrong selection message and move to 
 // the next question or end the quiz using quizEnd function
 // or restart the quiz
 // plays seprate sounds for reigt and wrong answers as well
 
function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQIndex].answer) {
    // penalize time
    time -= 15;

    if (time < 0) {
      time = 0;
    }
     // display new time on page
     timerEl.textContent = time;

     // play "wrong" sound effect
     sfxWrong.play();
 
     feedbackEl.textContent = "Wrong!";
   } else {
     // play "right" sound effect
     sfxRight.play();
 
     feedbackEl.textContent = "Correct!";
   }
 
   // flash right/wrong feedback on page for half a second
   feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
     feedbackEl.setAttribute("class", "feedback hide");
   }, 1000);
 
   // move to next question
   currentQIndex++;
 
   // check if we've run out of questions
   if (currentQIndex === questions.length) {
   //  quizEnd();
   } else {
     getQuestion();
   }
 }
  

// function clockTick is used to update timer
// and subtract time if user answer is wrong
function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    time=0
   // quizEnd();
  }
}



// user clicks button to start quiz
startBtn.onclick = startQuiz;


