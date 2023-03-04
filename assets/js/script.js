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
var questionNumber = 0;
var secondsLeft = 120;

//grab local storage and assign last place in 0 index
//populated empty indexes as 0 to be used at end of game getScore()
function renderHighScore() {
  if(localStorage.getItem("highScore3") != null){
    highScores.push(localStorage.getItem("highScore3"));
  } else {
    highScores.push(0);
  }
  if (localStorage.getItem("highScore2") != null) {
    highScores.push(localStorage.getItem("highScore2"));
  } else {
    highScores.push(0);
  }
  if (localStorage.getItem("highScore1") != null) {
    highScores.push(localStorage.getItem("highScore1"));
  } else {
    highScores.push(0);
  }
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
          function nextQuestion(data){
            console.log(questionNumber + "heres the length:" + data.length);
            if(questionNumber  != data.length) {
              let dataAtNum = data[questionNumber];
              question.innerHTML = data[questionNumber].question;
              answerList[0].innerHTML = dataAtNum.answer1;
              answerList[1].innerHTML = dataAtNum.answer2;
              answerList[2].innerHTML = dataAtNum.answer3;
              answerList[3].innerHTML = dataAtNum.answer4;
            } else{
              getScore();
            }
          }
          questionArea.addEventListener('click', function(event) {
            let element = event.target;
            if (element.matches("li")) {
              questionNumber++;
              console.log("you touches an li and heres the qestionNumber" + questionNumber);
              nextQuestion(data);
            }
          })
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





startEl.addEventListener("click", startGame);

function getScore() {
  let score = secondsLeft;
  timeEl.setAttribute("style", "display: none");
  questionArea.setAttribute("style", "display: none");
  submissionArea.setAttribute("style", "display: flex");
  document.querySelector("#score").innerHTML = "Your final score is " + score;
  submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    let initial = document.querySelector("#initials").value;
    let scores = [initial, score];
    for(let i = 0; i < 3; i++) {
      if(highScores[i] != null){
        if(highScores[i] < score) {
          // highScores[i] = score;
          if(highScores[i+1] != null) {
            if(highScores[i+1] > score) {
              highScores[i] = score;
            } else {
              highScores[i] = highScores[i + 1];
            }
          } else {
            highScores[i] = score;
          }
        }
      }
    }
    console.log("here an array of scores" + highScores);

    // need to fix array on making new scores!
    // localStorage.setItem("scoreData", highScores);
  } )
}

