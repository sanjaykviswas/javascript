const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MOSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";

const TARGET_MONSTER = "MONSTER";
const TARGET_PLAYER = "PLAYER";

const EVENT_LOG_PLAYER_ATTACK = "PLAYER_ATTACK";
const EVENT_LOG_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const EVENT_LOG_MOSTER_ATTACK = "MOSTER_ATTACK";
const EVENT_LOG_PLAYER_HEAL = "PLAYER_HEAL";
const EVENT_LOG_GAME_OVER = "GAME_OVER";

const enteredValue = prompt("Max life for you and your monster.", "100");

let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentMosterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, mosterHealth, playerHealth) {
  let logEntry = {
    event: event,
    value: value,
    finalMosterHealth: mosterHealth,
    finalPlayerHealth: playerHealth
  };

  switch (event) {
    case EVENT_LOG_PLAYER_ATTACK:
      logEntry.target = TARGET_MONSTER;
      break;
    case EVENT_LOG_PLAYER_STRONG_ATTACK:
      logEntry.target = TARGET_MONSTER;
      break;
    case EVENT_LOG_MOSTER_ATTACK:
      logEntry.target = TARGET_PLAYER;
      break;
    case EVENT_LOG_PLAYER_HEAL:
      logEntry.target = TARGET_PLAYER;
      break;
    case EVENT_LOG_GAME_OVER:
      break;
    default:
      logEntry = {};
  }

  //   if (event === EVENT_LOG_PLAYER_ATTACK) {
  //     logEntry = {
  //       event: event,
  //       value: value,
  //       target: TARGET_MONSTER,
  //       finalMosterHealth: mosterHealth,
  //       finalPlayerHealth: playerHealth
  //     };
  //   } else if (event === EVENT_LOG_PLAYER_STRONG_ATTACK) {
  //     logEntry = {
  //       event: event,
  //       value: value,
  //       target: TARGET_MONSTER,
  //       finalMosterHealth: mosterHealth,
  //       finalPlayerHealth: playerHealth
  //     };
  //   } else if (event === EVENT_LOG_MOSTER_ATTACK) {
  //     logEntry = {
  //       event: event,
  //       value: value,
  //       target: TARGET_PLAYER,
  //       finalMosterHealth: mosterHealth,
  //       finalPlayerHealth: playerHealth
  //     };
  //   } else if (event === EVENT_LOG_PLAYER_HEAL) {
  //     logEntry = {
  //       event: event,
  //       value: value,
  //       target: TARGET_PLAYER,
  //       finalMosterHealth: mosterHealth,
  //       finalPlayerHealth: playerHealth
  //     };
  //   } else if (event === EVENT_LOG_GAME_OVER) {
  //     logEntry = {
  //       event: event,
  //       value: value,
  //       finalMosterHealth: mosterHealth,
  //       finalPlayerHealth: playerHealth
  //     };
  //   }

  battleLog.push(logEntry);
}

function reset() {
  currentMosterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  let playerDamage = dealPlayerDamage(MOSTER_ATTACK_VALUE);
  let intialPlayerHealth = currentPlayerHealth;
  currentPlayerHealth -= playerDamage;

  writeToLog(
    EVENT_LOG_MOSTER_ATTACK,
    playerDamage,
    currentMosterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = intialPlayerHealth;
    setPlayerHealth(intialPlayerHealth);
    alert("You would be dead but the bonus life saved you!");
  }
  if (currentMosterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won!");
    writeToLog(
      EVENT_LOG_GAME_OVER,
      "PLAYER WON",
      currentMosterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMosterHealth > 0) {
    alert("You lose!");
    writeToLog(
      EVENT_LOG_GAME_OVER,
      "MONSTER WON",
      currentMosterHealth,
      currentPlayerHealth
    );
  } else if (currentMosterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("You have a draw!");
    writeToLog(
      EVENT_LOG_GAME_OVER,
      "A DRAW",
      currentMosterHealth,
      currentPlayerHealth
    );
  }

  if (currentMosterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMoster(mode) {
  let maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  let logEvent =
    mode === MODE_ATTACK
      ? EVENT_LOG_PLAYER_ATTACK
      : EVENT_LOG_PLAYER_STRONG_ATTACK;

  //   if (mode === MODE_ATTACK) {
  //     maxDamage = ATTACK_VALUE;
  //     logEvent = EVENT_LOG_PLAYER_ATTACK;
  //   } else if (mode === MODE_STRONG_ATTACK) {
  //     maxDamage = STRONG_ATTACK_VALUE;
  //     logEvent = EVENT_LOG_PLAYER_STRONG_ATTACK;
  //   }

  let damage = dealMonsterDamage(maxDamage);
  currentMosterHealth -= damage;
  writeToLog(logEvent, damage, currentMosterHealth, currentPlayerHealth);
  endRound();
}

function attackHandler() {
  attackMoster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMoster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth > chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal more than your max health!");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(
    EVENT_LOG_PLAYER_HEAL,
    healValue,
    currentMosterHealth,
    currentPlayerHealth
  );
  endRound();
}

function printLogHandler() {
  console.log(battleLog);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
