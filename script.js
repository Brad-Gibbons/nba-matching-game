const cardsArray = [{
    'name': 'Celtics',
    'img': 'images/boston-celtics-logo-vector.png',
  },
  {
    'name': 'Bulls',
    'img': 'images/chicago-bulls.png',
  },
  {
    'name': 'Cavs',
    'img': 'images/cleveland-cavaliers-logo-vector.png',
  },
  {
    'name': 'Warriors',
    'img': 'images/golden-state-warriors-logo-vector.png',
  },
  {
    'name': 'Lakers',
    'img': 'images/los-angeles-lakers-logo-vector.png',
  },
  {
    'name': 'Heat',
    'img': 'images/miami-heat-logo-vector.png',
  }, 
  {
    'name': 'Knicks',
    'img': 'images/new-york-knicks-logo-vector.png',
  },
  {
    'name': '76ers',
    'img': 'images/philadelphia-76ers-logo-vector.png',
  },
  {
    'name': 'Spurs',
    'img': 'images/san-antonio-spurs-logo-vector.png',
  },
  {
    'name': 'Jazz',
    'img': 'images/utah-jazz-logo-vector.png',
  }
];
let gameGrid = cardsArray.concat(cardsArray);
gameGrid.sort(() => 0.5 - Math.random());
//init count & guesses
let clicks = 0;
let delay = 1200
let previousTarget = null;
let count = 0;
let firstGuess = '';
let secondGuess = '';
//Highscore
var HighestScore = localStorage.getItem('totalScore');
// grab span tag
var Highscore = document.getElementById('Highscore');
Highscore.innerHTML = HighestScore;
//grab div
const game = document.getElementById('game');

//create section
const grid = document.createElement('section');
grid.setAttribute('class', 'grid')
//append section
game.appendChild(grid);
// grab start button
let startBtn = document.getElementById('start');
//Grab finish btn
let finBtn = document.getElementById('finish');
// START GAME
function startGame() {
  // start time
  startTimer();
  // disable finish btn
  if(clicks != 22) {
    finBtn.disabled = true;
  } else {
    finBtn.disabled = false;
  }
  // Hide startBtn
  startBtn.style.visibility = 'hidden';
  finBtn.style.visibility = 'visible';
//For each team in array -- Creates Gameboard
gameGrid.forEach(item => {
    const card = document.createElement('div');
    // adds class
    card.classList.add('card');
    // set data name to key name
    card.dataset.name = item.name;
    // create front of card
    const front = document.createElement('div');
    front.classList.add('front');

    // Create back of card
    const back = document.createElement('div');
    back.classList.add('back');
    // apply background image
    back.style.backgroundImage = `url(${item.img})`;
    // append to section
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
});

// Event listeners - For when user cicks, run code
grid.addEventListener('click', function (event) {
    // The event target is our clicked item
    let clicked = event.target;
    clicks++;
    // Do not allow the grid section itself to be selected; only select divs inside the grid
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget) { return; }
    
    if(count < 2) {
        count ++;
        if(count === 1) {
            // assign to first
            firstGuess = clicked.parentNode.dataset.name;
            console.log(firstGuess);
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            console.log(secondGuess);
            clicked.parentNode.classList.add('selected');
        }
    }
    // if both guesses are not empty
    if(firstGuess !== '' && secondGuess !== '') {
        if(firstGuess === secondGuess) {
            // its a match
            setTimeout(match, delay);
            setTimeout(resetGuesses, delay);
        } else {
            setTimeout(resetGuesses, delay);
        }
    }

    let  totalScore = 5000 / clicks;
    score = document.getElementById('score');
    displayedScore = totalScore.toFixed(0);
    score.innerHTML = displayedScore;
    previousTarget = clicked;
    // HighScores
    localStorage.setItem('totalScore', totalScore);
   
   });
  };
   // Is it a match?
   const match = () => {
    var selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
      card.classList.add('match');
    });
    localStorage.setItem('totalScore', totalScore);
  };

  // Not a match
  const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
  
    var selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
      card.classList.remove('selected');
    });
  };
  // init timing
  var second = 0, minute = 0;
  var timer = document.getElementById('timer');
  var interval;
function startTimer() {
   interval = setInterval(function(){
      timer.innerHTML = minute+"mins "+second+"secs";
      second++;
      if(second == 60){
          minute++;
          second = 0;
      }
      if(minute == 60){
          hour++;
          minute = 0;
      }
  },1000);
}


function finGame() {
 
  grid.innerHTML = "Congratulations!"
}


/* 
ADD INPUT INTO MAIN DIV ONCE GAME IS COMPLETE
 - TIME
 - SCORE
STYLING 
*/