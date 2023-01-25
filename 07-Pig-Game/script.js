'use strict';

// Seleccionando los elementos

// const score0 = document.querySelector('#score--0');
// Otra manera de seleccionar elementos por ID
const score0El = document.getElementById('score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Iniciando condiciones
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;

// Lanzar dados funcionalidad
btnRoll.addEventListener('click', () => {
	// 1. Generar un numero random
	const dice = Math.trunc(Math.random() * 6) + 1;

	// 2. Mostrar el dado
	diceEl.classList.remove('hidden');
	diceEl.src = `dice-${dice}.png`;

	// 3. Chequear para dado 1: si es verdadero, cambia al siguiente jugador
	if (dice !== 1) {
		// Agregar el dado al puntaje actual
		currentScore += dice;
		current0El.textContent = currentScore; // Cambiar mas tarde
	} else {
		// cambia al siguiente jugador
	}
});