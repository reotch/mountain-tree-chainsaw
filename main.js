// initialize user and computer scores to 0; global variables
let userScore = 0;
let compScore = 0;

// cache DOM variables for span and div tags
const userScore_span = document.getElementById('userscore');
const compScore_span = document.getElementById('computerscore');
const scoreboard_div = document.querySelector('.scoreboard');
const result_p = document.querySelector('.result > p');
const rock_div = document.getElementById('rock');
const paper_div = document.getElementById('paper');
const scissors_div = document.getElementById('scissors');
const reset_score = document.getElementById('reset-btn');


// random pick from computer
function compChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    let random = Math.floor(Math.random() * 3);
    return choices[random];
}
// console.log(compChoice())

// translate rock, paper, scissors to Mountain, Trees, Chainsaws
// redundant function...mostly for fun
function convertCase(word) {
    if (word === 'rock') return 'Mountain';
    if (word === 'paper') return 'Trees';
    if (word === 'scissors') return 'Chainsaws';
}

// behavior for user win
function win(user, computer) {
    userScore++;
    userScore_span.innerHTML = userScore;
    compScore_span.innerHTML = compScore;
    result_p.innerHTML = `${convertCase(user)} beats ${convertCase(computer)}<br>You win!`;
    // add class of .green-glow to whatever the winning choice is
    document.getElementById(user).classList.add('green-glow');
    setTimeout(() => document.getElementById(user).classList.remove('green-glow'), 500);
}

// behavior for user loss
function lose(user, computer) {
    compScore++;
    compScore_span.innerHTML = compScore;
    userScore_span.innerHTML = userScore;
    result_p.innerHTML = `Your opponent chose ${convertCase(computer)}<br>You lose!`;
    document.getElementById(user).classList.add('red-glow');
    setTimeout(() => document.getElementById(user).classList.remove('red-glow'), 500);
}

// behavior for tie
function tie(user, computer) {
    result_p.innerHTML = `Your opponent chose the same<br>Tie!`;
    document.getElementById(user).classList.add('gray-glow');
    setTimeout(() => document.getElementById(user).classList.remove('gray-glow'), 500);
}

// reset scores to zero
function reset_game() {
    if (userScore != 0 || compScore != 0) {
        userScore = 0;
        compScore = 0;
        userScore_span.innerHTML = userScore;
        compScore_span.innerHTML = compScore;
        result_p.innerHTML = 'Score<br>reset! ';
        setTimeout(() => result_p.innerHTML = 'Let\'s play<br>again! ', 1200);
    } 
    console.log('You have reset the score')
}

// logic for evaluating win, loss, tie
function game(userChoice) {
    let computerChoice = compChoice();
    switch (userChoice + computerChoice) {
        case 'rockscissors':
        case 'paperrock':
        case 'scissorspaper':
            win(userChoice, computerChoice);
            break;
        case 'scissorsrock':
        case 'rockpaper':
        case 'paperscissors':
            lose(userChoice, computerChoice);
            break;
        case 'rockrock':
        case 'paperpaper':
        case 'scissorsscissors':
            tie(userChoice, computerChoice);
            break;
    }
    console.log("Computer chooses " + computerChoice);
    console.log('You have chosen ' + userChoice);
}

// function to run the game
function main () {
    // event listeners in ES6 arrow function format
    rock_div.addEventListener('click', () => game('rock'));
    paper_div.addEventListener('click', () => game('paper'));
    scissors_div.addEventListener('click', () => game('scissors'));
    reset_score.addEventListener('click', () => reset_game());
}

main();