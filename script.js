let playerScore;
let computerScore;

// Score Section
const domPlScore = document.querySelector('#pl-score');
const domCpScore = document.querySelector('#cp-score');

// Monitor
const winnerText = document.querySelector('.cp-board__winner-text');
const cpOptions = document.querySelectorAll('.cp-board__cp-option');
const winnerImgs = document.querySelectorAll('.cp-board__winner-img')
const results = document.querySelector('.cp-board__results');
const playAgainBtn = document.querySelector('.cp-board__play-again');

// Player Options
const plBoard = document.querySelector('.pl-board');
const plOptions = document.querySelectorAll('.pl-board__pl-option');

// Starting Screen
function startGame() {
    playerScore = 0;
    domPlScore.innerText = playerScore;
    computerScore = 0;
    domCpScore.innerText = computerScore;

    winnerText.classList.add('hidden');
    winnerImgs.forEach(img => {
        img.classList.add('hidden');
    });
    playAgainBtn.classList.add('hidden');

    results.classList.remove('hidden');
    plBoard.style.display = 'flex';

    plOptions.forEach(option => {
        option.addEventListener('click', playRound);
    });
}

startGame();

// Gameflow for each round
function playRound(e) {
    const playerChoice = e.currentTarget.getAttribute('data-option');
    const computerChoice = getComputerChoice();

    showPlayerChoice(playerChoice);
    showComputerChoice(computerChoice);

    determineWinner(playerChoice, computerChoice);
    checkScore();

    resetGameboard();
}

// Helper Functions
function getComputerChoice() {
    const options = ["rock", "paper", "scissors"];
    const index = Math.floor(Math.random() * 3);
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
    cpOptions.forEach(option => {
        if (option.getAttribute('data-option') === computerChoice) {
            option.classList.remove('hidden');
        } else {
            option.classList.add('hidden');
        }
    });
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        results.innerText = "It's a tie! 😑";

    } else if (playerChoice === "rock" && computerChoice === "scissors" ||
               playerChoice === "paper" && computerChoice === "rock" ||
               playerChoice === "scissors") {
        domPlScore.innerText = ++playerScore;
        results.innerText = "Player wins! 😊";

    } else {
        domCpScore.innerText = ++computerScore;
        results.innerText = "Computer wins! 🥲";
    }
}

function checkScore() {
    if (playerScore === 5) {
        showFinalWinner("player");
    } else if (computerScore === 5) {
        showFinalWinner("computer");
    }
}

function resetGameboard() {
    setTimeout(() => {
        results.innerText = "Make your move!";

        plOptions.forEach(option => {
            option.classList.remove('fade');
            option.addEventListener('click', playRound);
        });

        cpOptions.forEach(option => {
            option.classList.add('hidden');
        });
    }, 1300);
}

function showFinalWinner(winner) {
    winnerText.classList.remove('hidden');

    cpOptions.forEach(option => {
        option.classList.add('hidden');
    });

    const playerImage = document.querySelector('#pl-winner-img');
    const computerImage = document.querySelector('#cp-winner-img');
    if (winner === "player") {
        playerImage.classList.remove('hidden');
    } else if (winner === "computer") {
        computerImage.classList.remove('hidden');
    }

    results.classList.add('hidden');

    playAgainBtn.classList.remove('hidden');
    playAgainBtn.addEventListener('click', e => {
        startGame();
    });
   
    plBoard.style.display = 'none';
}
