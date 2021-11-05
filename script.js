use strict';

// Selecting elements

const player1El = document.querySelector(`.player--0`);
const player2El = document.querySelector(`.player--1`);
const score1El = document.querySelector(`#score--0`);
const score2El = document.querySelector(`#score--1`);
const current1El = document.querySelector(`#current--0`);
const current2El = document.querySelector(`#current--1`);
const diceEl = document.querySelector(`.dice`);
const bntNew = document.querySelector(`.btn--new`);
const bntRoll = document.querySelector(`.btn--roll`);
const bntHold = document.querySelector(`.btn--hold`);

// Starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current1El.textContent = 0;
  current2El.textContent = 0;
  score1El.textContent = 0;
  score2El.textContent = 0;
  diceEl.classList.add(`hidden`);
  player1El.classList.remove(`player--winner`);
  player2El.classList.remove(`player--winner`);
  player1El.classList.add(`player--active`);
  player2El.classList.remove(`player--active`);
};

init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player1El.classList.toggle(`player--active`);
  player2El.classList.toggle(`player--active`);
};

// Rolling dice functionality

bntRoll.addEventListener(`click`, function () {
  if (playing) {
    // generating a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    // display dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;
    //check if the rolled is 1
    if (dice != 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

bntHold.addEventListener(`click`, function () {
  if (playing) {
    // add current score to the score activeplayer
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if the score is >= 40
    if (scores[activePlayer] >= 40) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      diceEl.classList.add(`hidden`);
    } else {
      switchPlayer();
    }
  }
});

bntNew.addEventListener(`click`, init);
