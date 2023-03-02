//for Json file https://www.youtube.com/watch?v=Fva57lcikK0
var url = './json/data.JSON'
var timeEl = document.querySelector(".time");
var startEl = document.querySelector("#start");
var titleEl = document.querySelector("#title");
var questionArea = document.querySelector(".questionArea");
var answerList = document.querySelector("#answerList").children;
var question = document.querySelector("#question");
var submissionArea = document.querySelector(".submissionArea");
var submitButton = document.querySelector("#submit");
var highScores = [];
//setup conditions
var questionNumnber = 0;
var secondsLeft = 120;

//grab local storage
function renderHighScore() {
  highScores = localStorage.getItem("scoreData");
  console.log(highScores);
  return;
}

renderHighScore();

  //first init of game
function startGame(event) {
    getJSON();
    event.preventDefault();
    // question.textContent = ;
    setTime();
    titleEl.setAttribute("style", "display: none");
    questionArea.setAttribute("style", "display: flex", "flex-direction: column");
    
}

// from youtube link
//grabs json file 
function getJSON() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
          //starts the first game
          nextQuestion(data);
        })
        .catch((error) => {
            console.error(error);
        })
  }

// var data = getJSON();
//timer function
function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = "Time: " + secondsLeft;
  
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and append image
        getScore();
      }
  
    }, 1000);
  }

function nextQuestion(data){
  console.log(questionNumnber + 1 + "heres the length:" + data.length);
  if(questionNumnber + 1  == data.length) {
    getScore();
  }
  let dataAtNum = data[questionNumnber];
  question.innerHTML = data[questionNumnber].question;
  answerList[0].innerHTML = dataAtNum.answer1;
  answerList[1].innerHTML = dataAtNum.answer2;
  answerList[2].innerHTML = dataAtNum.answer3;
  answerList[3].innerHTML = dataAtNum.answer4;
  questionArea.addEventListener('click', function(event) {
    var element = event.target;
    if (element.matches("li")) {
      questionNumnber++;
      if(questionNumnber == data.length) {
        getScore();
        return;
      }
      console.log("you touches an li");
      nextQuestion(data);
    }
  })
}
  
startEl.addEventListener("click", startGame);

function getScore() {
  let score = secondsLeft;
  questionArea.setAttribute("style", "display: none");
  submissionArea.setAttribute("style", "display: flex");
  document.querySelector("#score").innerHTML = "Your final score is " + score;
  submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    let initial = document.querySelector("#initials").value;
    let scores = [initial, score];
    highScores.push(scores);

    console.log("here are some scores" + scores);

    // need to fix array on making new scores!
    // localStorage.setItem("scoreData", highScores);
  } )
}

