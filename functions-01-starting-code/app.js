const startGameBtn = document.getElementById("start-game-btn");

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const DEFAULT_USER_CHOICE = ROCK;
const RESULT_DRAW = "DRAW";
const RESULT_PLAYER_WIN = "PLAYER_WIN";
const RESULT_COMPUTER_WIN = "COMPUTER_WIN";

let gameIsRunning = false;

const getPlayerChoice = () => {
  const selection = prompt(
    `${ROCK}, ${PAPER} or ${SCISSORS}?`,
    ""
  ).toUpperCase();
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert(`Invalid choice! We chose ${ROCK} for you!`);
    return DEFAULT_USER_CHOICE;
  }
  return selection;
};

const getComputerChoice = () => {
  const randomValue = Math.random();
  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
};

const getWinner = (cChoice, pChoice) =>
  cChoice === pChoice
    ? RESULT_DRAW
    : (cChoice === ROCK && pChoice === PAPER) ||
      (cChoice === PAPER && pChoice === SCISSORS) ||
      (cChoice === SCISSORS && pChoice === ROCK)
    ? RESULT_PLAYER_WIN
    : RESULT_COMPUTER_WIN;

// const getWinner = function(cChoice, pChoice) {
//   if (cChoice === pChoice) {
//     return RESULT_DRAW;
//   } else if (
//     (cChoice === ROCK && pChoice === PAPER) ||
//     (cChoice === PAPER && pChoice === SCISSORS) ||
//     (cChoice === SCISSORS && pChoice === ROCK)
//   ) {
//     return RESULT_PLAYER_WIN;
//   } else {
//     return RESULT_COMPUTER_WIN;
//   }
// };

function startGame() {
  if (gameIsRunning) {
    return;
  }
  gameIsRunning = true;
  console.log("Game is starting...");
  const playerSelection = getPlayerChoice();
  const computerSelection = getComputerChoice();
  const winner = getWinner(computerSelection, playerSelection);

  let message = `You picked ${playerSelection}, computer picked ${computerSelection}. Therefore you `;
  if (winner === RESULT_DRAW) {
    message = message + "had a draw.";
  } else if (winner === RESULT_PLAYER_WIN) {
    message = message + "won.";
  } else {
    message = message + "lost.";
  }
  alert(message);
  gameIsRunning = false;
  console.log(computerSelection);
  console.log(playerSelection);
  console.log(winner);
}

startGameBtn.addEventListener("click", startGame);
