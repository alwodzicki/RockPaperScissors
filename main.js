//selecting elements on DOM and setting scores
const choices = document.querySelectorAll('.choice');
const compChoiceSpan = document.querySelector('#compChoiceSpan');
const userScoreSpan = document.querySelector('#user-score');
const compScoreSpan = document.querySelector('#comp-score');
const roundSpan = document.querySelector('#roundNum');
let roundCount = 1;
let userScore = 0;
let compScore = 0;
const message = document.querySelector('#message'); //needed to update comp choice and taunting sayings
const scoreboard = document.querySelector('.scoreboard'); //needed for winning and losing style updates
const rockDiv = document.querySelector('#rock');
const paperDiv = document.querySelector('#paper');
const scissorsDiv = document.querySelector('#scissors');
const shoot = document.querySelector('#shoot');


//random number generator
function randomNum(num){
  return Math.floor(Math.random() * num);
}

// generate computer choice for gameplay
function getCompChoice(){
  const compChoice = ['rock', 'paper', 'scissors']
  return compChoice[randomNum(3)];
}
// returns taunting computer response
function getSaying(){
  const compSaying = ['Are you sure?', 'Hmm..', 'Waiting...', 'Good luck', 'Think again', 'Maybe'];
  return compSaying[randomNum(6)];
}
// updates computer choice on board
function compChose(something){
  let capitalFirstLetter = something[0].toUpperCase();
  let capitalWord = capitalFirstLetter + something.slice(1);
  compChoiceSpan.textContent = capitalWord;
}

// change hover state of choiceBox
for (let i=0; i<choices.length; i++){
  choices[i].addEventListener('mouseenter', ()=>{
    choices[i].style.backgroundColor = '#FFD400';
    choices[i].style.color = '#2E294E';
    choices[i].style.cursor = 'pointer';
    //update taunting computer when hovering
    compChoiceSpan.textContent = getSaying();
  });
  choices[i].addEventListener('mouseleave', ()=>{
    choices[i].style.backgroundColor = '#2E294E';
    choices[i].style.color = '#FFF';
  });
}

//increase round number
function addARound(){
  roundCount++;
  roundSpan.textContent = roundCount;
}
//secret shoot message
function secretShoot(){
  shoot.style.visibility = 'visible';
  setTimeout(() => shoot.style.visibility = 'hidden', 200);
}

//win, lose, draw functions
function win(user, computer){
  userScore++;
  userScoreSpan.textContent= userScore;
  scoreboard.classList.add('winningStyles');
    setTimeout(() => scoreboard.classList.remove('winningStyles'), 500);
  message.textContent = `You win! ${user} beats ${computer}.`;
}
function lose(user, computer){
  compScore++;
  compScoreSpan.textContent= compScore;
  scoreboard.classList.add('losingStyles');
    setTimeout(() => scoreboard.classList.remove('losingStyles'), 500);
  message.textContent = `You lose. ${computer} beats ${user}.`;
}
function draw(user){
  message.textContent = `It's a draw. Both players chose ${user}.`;
}

// gameplay
function play(user){
  const computer = getCompChoice();
  addARound();
  compChose(computer);
  switch(user + computer) {
    case 'rockscissors':
    case 'paperrock':
    case 'scissorspaper':
      win(user, computer);
      break;
    case 'rockpaper':
    case 'paperscissors':
    case 'scissorsrock':
      lose(user, computer);
      break;
    case 'rockrock':
    case 'paperpaper':
    case 'scissorsscissors':
      draw(user);
      break;
  }
}
rockDiv.addEventListener('click', () => {
  play('rock')
  secretShoot();
});
paperDiv.addEventListener('click', () => {
  play('paper');
  secretShoot();
});
scissorsDiv.addEventListener('click', () => {
  play('scissors');
  secretShoot();
});
