// Quiz logic is built in this file
// First strat quiz and get question functions logic is built

var currentQIndex = 0.;
// Allowed time for quiz is number of questions multiplied by 15 sec
var time = questions.length * 15;
var timerId;


// Acess questions and questions' choices
// from question js file "questions.js"


// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

// Acess sound effects files from sfx folder
// acessing correct and incorrect answers sound effcts 

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
   timerId = setInterval(clockTick, 1000);

  // show starting time
  timerEl.textContent = time;
  console.log(timerEl.textContent)
  getQuestion();
}
// Built getQuestion function
function getQuestion() {
  // get current question object from  currentQ array
  var currentQ = questions[currentQIndex];

  // update title reading current question title from the question array.
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQ.title;

  // clear out any old question choices
  choicesEl.innerHTML = "";

  // loop over question choices
  // foreach() method operate on choices object 
  // Create a button for the each choice node and
  // attach an event listner to each choice  (questionClick ) function
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
 // or restart the quiz by calling getQuestion() again.
 
 // plays seprate sounds for right and wrong answers as well
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
     // color chnages to red.
     feedbackEl.setAttribute("class", "feedbackw");
   } else {
     // play "right" sound effect
     sfxRight.play();
 
     feedbackEl.textContent = "Correct!";
     // color changes to green
     feedbackEl.setAttribute("class", "feedbackc");
   }
 
   // flash right/wrong feedback on page for half a second
  // feedbackEl.setAttribute("class", "feedback");
   
   // add setTimeout method on feedbackEl
    setTimeout(function() {
     feedbackEl.setAttribute("class", "feedback hide");
   }, 1000);
 
   // move to next question
   currentQIndex++;
 
   // check if we've run out of questions
   if (currentQIndex === questions.length) {
     quizEnd();
   } else {
     getQuestion();
   }
 }
  

// Function quizEnd() stops timer by using clearInterval method
// shows final scores 
function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

// function clockTick is used to update timer
// and subtract time if user answer is wrong
// Also, calls end of quiz function if quiz time is expired.
function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    time=0
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}
  // user clicks button to submit initials
  submitBtn.onclick = saveHighscore;
  

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;