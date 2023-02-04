/* Pseudocode
RPS Game
- Get player choice
    - If player enters a choice:
        - Check if player's choice is rps
        - If player's choice is rps:
            - Generate random computer choice
            - Play a round
            - Display results
        - If player's choice is not rps, get player choice again
    - If player doesn't enter a choice, get player choice again.

- Play five rounds */

let playerScore = 0;
let computerScore = 0;

function checkPlayerChoice(playerChoice) {
    switch (playerChoice) {
        case "rock":
        case "paper":
        case "scissors":
            return playerChoice;
        default:
            return false;
    }
}

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const index = Math.floor(Math.random() * 3);
    return choices[index];
}

function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return `It's a tie! ( ͡° ͜ʖ ͡°)\nPlayer: ${playerScore}, Computer: ${computerScore}`;

    } else if (playerChoice === "rock" && computerChoice === "scissors" ||
               playerChoice === "paper" && computerChoice === "rock" ||
               playerChoice === "scissors") {
        playerScore++;
        return `You win! o(*^▽^*)┛ ${playerChoice.charAt(0).toUpperCase()}${playerChoice.slice(1)} beats Computer's ${computerChoice}.\nPlayer: ${playerScore}, Computer: ${computerScore}`;

    } else {
        computerScore++;
        return `You lose! (╬▔皿▔)╯ Computer's ${computerChoice} beats ${playerChoice}.\nPlayer: ${playerScore}, Computer: ${computerScore}`;
    }
}

function getFinalWinner() {
    const result = playerScore === computerScore
    ? `Tie Game (*^-^*)\nPlayer: ${playerScore}, Computer: ${computerScore}`
    : playerScore > computerScore
    ? `Player wins!╰(*°▽°*)╯\nPlayer: ${playerScore}, Computer: ${computerScore}`
    : `Computer wins! ╰(艹皿艹 )\nPlayer: ${playerScore}, Computer: ${computerScore}`;

    return result;
}

function playRPS() {
    let rounds = 0;
    while(rounds < 5) {
        let initPlayerChoice = prompt("Please enter rock, paper, or scissors");

        if (initPlayerChoice === "") {
            alert("Oops! You didn't enter anything.");

        } else if (initPlayerChoice) {
            initPlayerChoice = initPlayerChoice.trim().toLowerCase();
            const playerChoice = checkPlayerChoice(initPlayerChoice);

            if (playerChoice) {
                const computerChoice = getComputerChoice();
                console.log(playRound(playerChoice, computerChoice));
                rounds++;
            } else {
                alert("You didn't enter rock, paper, or scissors!");
            }

        } else {
            alert("Let's continue some other time.");
            break;
        }
    } 
    console.log(getFinalWinner());
}

const startGame = confirm("Want to play five rounds of rock, paper, scissors?")
? playRPS()
: alert("Ok, maybe next time");