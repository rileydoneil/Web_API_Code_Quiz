//for Json file https://www.youtube.com/watch?v=Fva57lcikK0
var url = './json/data.JSON'
var timeEl = document.querySelector(".time");
var startEl = document.querySelector("#start");
var titleEl = document.querySelector("#title");
var questionArea = document.querySelector(".questionArea");
var question = document.querySelector("#question")
// var answer1 = document.querySelector("#A1");
// var answer2 = document.querySelector("#A2")
// var answer3 = document.querySelector("#A3");
// var answer4 = document.querySelector("#A4");
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
    questionArea.setAttribute("style", "display: flex");
    if(event)

    return;
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
    var children = questionArea.children;
    let i = 0;
    data.forEach(element => {
      console.log(element);
    });
    console.log(data[0]);

    console.log(children[i]);
    // children[i].innerHTML = data[questionNumnber][i];
    // console.log(children);
    // for(i = 1; i < children.length; i++) {
    //   children[i].innerHTML= data[questionNumnber][i];
    // }
  }
  
  startEl.addEventListener("click", startGame);

