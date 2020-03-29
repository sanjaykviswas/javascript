const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MOSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";

const enteredValue = prompt("Max life for you and your monster.", "100");

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentMosterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset() {
  currentMosterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  let playerDamage = dealPlayerDamage(MOSTER_ATTACK_VALUE);
  let intialPlayerHealth = currentPlayerHealth;
  currentPlayerHealth -= playerDamage;
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = intialPlayerHealth;
    setPlayerHealth(intialPlayerHealth);
    alert("You would be dead but the bonus life saved you!");
  }
  if (currentMosterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You won!");
  } else if (currentPlayerHealth <= 0 && currentMosterHealth > 0) {
    alert("You lose!");
  } else if (currentMosterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("You have a draw!");
  }

  if (currentMosterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMoster(mode) {
  let maxDamage;
  if (mode === MODE_ATTACK) {
    maxDamage = ATTACK_VALUE;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  let damage = dealMonsterDamage(maxDamage);
  currentMosterHealth -= damage;
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
  endRound();
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
