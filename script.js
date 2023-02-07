let playerScore;
let computerScore;

// Score Section
const domPlScore = document.querySelector('#pl-score');
const domCpScore = document.querySelector('#cp-score');

// Monitor
const winnerText = document.querySelector('.cp-board__winner-text');
const cpChoiceImg = document.querySelector('.cp-board__cp-option');
const winnerImg = document.querySelector('.cp-board__winner-img');
const results = document.querySelector('.cp-board__results');
const playAgainBtn = document.querySelector('.cp-board__play-again');

// Player Options
const plBoard = document.querySelector('.pl-board');
const plOptions = document.querySelectorAll('.pl-board__pl-option');

// Starting Screen
function startGame() {
    resetScores();

    winnerText.classList.add('hidden');
    winnerImg.classList.add('hidden');
    playAgainBtn.classList.add('hidden');

    cpChoiceImg.classList.remove('hidden');
    results.classList.remove('hidden');
    plBoard.style.display = 'flex';

    plOptions.forEach(option => {
        option.addEventListener('click', playRound);
    });
}

startGame();

// Gameflow for each round
function playRound() {
    const playerChoice = this.getAttribute('data-option');
    const computerChoice = getComputerChoice();

    showPlayerChoice(playerChoice);
    showComputerChoice(computerChoice);

    determineWinner(playerChoice, computerChoice);
    checkScore();

    resetGameboard();
}

// Helper Functions
function resetScores() {
    playerScore = 0;
    computerScore = 0;
    domPlScore.innerText = playerScore;
    domCpScore.innerText = computerScore;
}

function getComputerChoice() {
    const options = ["rock", "paper", "scissors"];
    const index = Math.floor(Math.random() * options.length);
    return options[index];
}

function showPlayerChoice(playerChoice) {
    plOptions.forEach(option => {
        option.removeEventListener('click', playRound);
        if (option.getAttribute('data-option') === playerChoice) {
            option.classList.remove('fade');
        } else {
            option.classList.add('fade');
        }
    });
}

function showComputerChoice(computerChoice) {
    cpChoiceImg.src = `img/cp-${computerChoice}.png`;
    cpChoiceImg.alt = `${computerChoice}`;
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        results.innerText = "It's a tie! 😑";

    } else if (playerChoice === "rock" && computerChoice === "scissors" ||
               playerChoice === "paper" && computerChoice === "rock" ||
               playerChoice === "scissors" && computerChoice === "paper") {
        domPlScore.innerText = ++playerScore;
        results.innerText = "Player wins! 😊";

    } else {
        domCpScore.innerText = ++computerScore;
        results.innerText = "Computer wins! 🥲";
    }
}

function checkScore() {
    if (playerScore === 5) showFinalWinner("player");
    if (computerScore === 5) showFinalWinner("computer");
}

function resetGameboard() {
    setTimeout(() => {
        results.innerText = "Make your move!";

        plOptions.forEach(option => {
            option.classList.remove('fade');
            option.addEventListener('click', playRound);
        });

        cpChoiceImg.removeAttribute('src');
        cpChoiceImg.removeAttribute('alt');
    }, 1300);
}

function showFinalWinner(winner) {
    cpChoiceImg.classList.add('hidden');
    results.classList.add('hidden');
    plBoard.style.display = 'none';

    winnerText.classList.remove('hidden');

    winnerImg.classList.remove('hidden');
    winnerImg.src = `img/${winner}.png`;
    winnerImg.alt = `${winner}`;

    playAgainBtn.classList.remove('hidden');
    playAgainBtn.addEventListener('click', e => {
        startGame();
    });
}
