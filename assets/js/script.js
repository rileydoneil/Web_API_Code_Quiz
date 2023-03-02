//for Json file https://www.youtube.com/watch?v=Fva57lcikK0
var url = './json/data.JSON'
var timeEl = document.querySelector(".time");
var startEl = document.querySelector("#start");
var titleEl = document.querySelector("#title");
var questionArea = document.querySelector(".questionArea");
var answerList = document.querySelector("#answerList").children;
var question = document.querySelector("#question")

var questionNumnber = 0;

var secondsLeft = 120;

  //first init of game
function startGame(event) {
    var element = event.target;
    getJSON();
    event.preventDefault();
    // question.textContent = ;
    setTime();
    titleEl.setAttribute("style", "display: none");
    questionArea.setAttribute("style", "display: flex", "flex-direction: column");
    if (element.matches("li")) {
      let state = element.getAttribute("data-number");
      console.log("you pressed index:" + state);
    }
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
        sendMessage();
      }
  
    }, 1000);
  }
  //${'answer' + i}
  //output: "answer1"
  //ul[0].innerHTML = data.${'answer' +1 };

  function nextQuestion(data){
    let dataAtNum = data[questionNumnber];


    console.log("I am a data[questionNumnber][i]" + data[questionNumnber].question);
    question.innerHTML = data[questionNumnber].question;
    console.log(answerList[0]);
    answerList[0].innerHTML = dataAtNum.answer1;
    answerList[1].innerHTML = dataAtNum.answer2;
    answerList[2].innerHTML = dataAtNum.answer3;
    answerList[3].innerHTML = dataAtNum.answer4;
  }
  
  startEl.addEventListener("click", startGame);

