'use strict';

// Seleccionando los elementos

// const score0 = document.querySelector('#score--0');
// Otra manera de seleccionar elementos por ID
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = () => {
	// Iniciando condiciones
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	playing = true;
	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;
	diceEl.classList.add('hidden');
	player0El.classList.remove('player--winner');
	player1El.classList.remove('player--winner');
	player0El.classList.add('player--active');
	player1El.classList.remove('player--active');
}

init();

const switchPlayer = () => {
	// Lo realizamos antes de hacer el switch
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	// cambia al siguiente jugador
	activePlayer = activePlayer === 0 ? 1 : 0;
	currentScore = 0;
	player0El.classList.toggle('player--active');
	player1El.classList.toggle('player--active');
}

// Lanzar dados funcionalidad
btnRoll.addEventListener('click', () => {
	if (playing) {
		// 1. Generar un numero random
		const dice = Math.trunc(Math.random() * 6) + 1;

		// 2. Mostrar el dado
		diceEl.classList.remove('hidden');
		diceEl.src = `dice-${dice}.png`;

		// 3. Chequear para dado 1: si es verdadero, cambia al siguiente jugador
		if (dice !== 1) {
			// Agregar el dado al puntaje actual
			currentScore += dice;
			document.getElementById(`current--${activePlayer}`).textContent = currentScore;

		} else {
			switchPlayer();
		}
	}
});

btnHold.addEventListener('click', () => {
	if (playing) {
		// 1. Add current score to active player's score
		scores[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

		// 2. Check if player's score is >= 100
		if (scores[activePlayer] >= 100) {
			// Finish the game
			diceEl.classList.add('hidden');
			playing = false;
			document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

			document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
		} else {
			// Switch to next player
			switchPlayer();
		}
	}
});

btnNew.addEventListener('click', init)


