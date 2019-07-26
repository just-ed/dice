let scores, roundScore, activePlayer, gamePlaying;

// Functions
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');

  hideElement('dice-1');
  hideElement('dice-2');
}

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  hideElement('dice-1');
  hideElement('dice-2');
}

function hideElement(element) {
  document.getElementById(element).style.display = 'none';
}

// Game process
init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
      let dice1 = Math.floor(Math.random() * 6) + 1;
      let dice2 = Math.floor(Math.random() * 6) + 1;

      document.getElementById('dice-1').style.display = 'block';
      document.getElementById('dice-2').style.display = 'block';
      document.getElementById('dice-1').src = `dice-${dice1}.png`;
      document.getElementById('dice-2').src = `dice-${dice2}.png`;

      if (dice1 !== 1 && dice2 !== 1) {
        roundScore += dice1 + dice2;
        document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
      } else {
        nextPlayer();
      }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;

    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];

    let maxScore = document.querySelector('.max-score').value;
    if (!maxScore) maxScore = 100;

    if (scores[activePlayer] >= maxScore) {
      document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
      hideElement('dice-1');
      hideElement('dice-2');
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');

      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);
