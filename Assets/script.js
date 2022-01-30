var countEl = document.querySelector("#count");
var highScoresEl = document.querySelector ("#highScore");
var largeFontEl = document.querySelector (".largeFont");
var scoreBoardEl = document.querySelector (".scoreBoard");

//text content
countEl.textContent="Time:";
highScoresEl.textContent="View High Scores:"


//set style for time and scores
countEl.setAttribute("style", "margin:auto; width:100%; text-align:left;");
highScoresEl.setAttribute("style", "margin:auto; width:90%; text-align:right;");

var timeStart = document.querySelector('#str-btn');
var timerEl = document.querySelector('#count');

var timeLeft = 30;

function timer(totalTime){
  
  var timeInterval = setInterval(function(){
      if(timeLeft > 1){
          timerEl.textContent = "Time:" + timeLeft + " seconds remaining";
          timeLeft--;    
      }else if(timeLeft == 1){
          timerEl.textContent ="Time:" + timeLeft + " second remaining";
          timeLeft--;
      }else if(timeLeft === 0) {
        $('.quizzContainer').hide();
            prompt ("GAME OVER");
            reloadPage();
      }else{
          // Stops execution of action at set interval
          timerEl.textContent = ' ';
          clearInterval(timeInterval);
      }
  }, 1000);
        

}

$('.quizzContainer').hide();
timeStart.addEventListener('click',function(){
  timer();
  $('.hero').remove();
  $('.quizzContainer').show();
  populateQuizz();
  
});
const quizData = [
    {
      question: "Which of the following reason best fit for JavaScript?",
      a: "Structure",
      b: "Design",
      c: "Data",
      d: "Behaviour",
      correct: "d",
    },
    {
      question: "What is the natural environment for JavaScript?",
      a: "The browser, server environment, and your computer",
      b: "The browser",
      c: "The Code editor",
      d: "Server environment",
      correct: "a",
    },
    {
      question: "Which of the below object property names are valid?",
      a: "Prop-name",
      b: "3rdProp",
      c: "space",
      d: "propName",
      correct: "d",
    },
];
// varijable

let index = 0;
let score = 0;

const quizzTitle = document.querySelector('.quizzTitle');
const quizzForm = document.querySelector('.quizzForm');
const quizzCard = document.querySelector('.quizzCard');
const btnSubmit = document.querySelector('.btn-submit');
let input = quizzForm.querySelectorAll('input');

// event listener
window.addEventListener('DOMContentLoaded', populateQuizz);
btnSubmit.addEventListener('click', increaseIndex);

// Lists of Questions

function populateQuizz() {
  quizzTitle.innerHTML = quizData[index].question;

  quizzForm.children[0].children[1].innerHTML = quizData[index].a;
  quizzForm.children[1].children[1].innerHTML = quizData[index].b;
  quizzForm.children[2].children[1].innerHTML = quizData[index].c;
  quizzForm.children[3].children[1].innerHTML = quizData[index].d;
}

// Display right or wrong message on answers

function displayMessage(type, message) {
  var msgDiv = document.querySelector("#msg");
  msgDiv.textContent = message;
  msgDiv.setAttribute("class", type);

};
// Correct Answers
function increaseIndex() {
  let response = selectedAnswer();
  quizzTitle.innerHTML = '';

  if (response === quizData[index].correct) {
    displayMessage("success", "Your previous answer was right!!!");
    score++;
    
  }else {
    displayMessage("error", "Your previous answer was wrong!!!");
    timeLeft -= 10;
  }

  index++;
  console.log(index);

  if (index === quizData.length) {
    index = 0;

    quizzCard.innerHTML = `<div class='resultContent'>
    <h5>Correct Answers: ${score} / 
    ${quizData.length}</h5>
    <button class="btn-submit restart">Restart</button>
    <button class="btn-submit SaveScore">Save Score</button>
    </div>`;

    let btnRestart = document.querySelector('.restart');

    btnRestart.addEventListener('click', reloadPage);

    var scoreEl = document.querySelector (".SaveScore");

    scoreEl.addEventListener('click', showScore);
  }

  deselectCheckbox();
  populateQuizz();  

}

// Selected Answers

function selectedAnswer() {
  let answer;

  input.forEach((item) => {
    if (item.checked) {
      answer = item.id;
    }
  });

  return answer;
}

// Deselected Answers

function deselectCheckbox() {
  input.forEach((item) => {
    item.checked = false;
  });
}

// Reload pages

function reloadPage() {
  window.location.reload();
}


function showScore() {
  var player = prompt ("please enter your name.");
  var scoreB = player + (" : ") + score;
  console.log(scoreB);
  
  //scorebtnEl.setAttribute("style", "display:inline-block;");


  //questionsEl.innerHTML = player + (", your socre is");
  //scoreBoardEl.innerHTML = score + ("out of 3");
  highScoresEl.textContent="View High Scores:" + scoreB;

  localStorage.setItem("score", scoreB);
  displayScore(); 
};

//scorebtnEl.addEventListener ('click', function() {

// displayScore(); 
// })

function displayScore() {
  var list = document.createElement("li");
  list.textContent = localStorage.getItem("score");

  var board = document.getElementById("highScore");

  board.appendChild(list);
  console.log(list);
}

