'use strict';

/*
// SE utiliza para seleccionar un elemento del dom mediante los selectores de css
document.querySelector('.message');

// El textContent nos muestra el texto que contiene el elemento que seleccionamos
console.log(document.querySelector('.message').textContent);

/////////////////////////////////////////////
// Que es el DOM y Manipulacion del DOM


// El Document Object Model (DOM): Es una representacion estructurada de documentos HTML.
// Permite a JavaScript acceder a elementos HTML y estilos para manipularlos.

// Settear la propiedad de texto

document.querySelector('.message').textContent = 'Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

// Si es un input debemos utilizar value para obtener el valor actual que tiene

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
document.querySelector('.number').textContent = secretNumber;

const decreaseScore = () => {
	score--;
	console.log(score);
}

document.querySelector('.check').addEventListener('click', () => {
	const guess = Number(document.querySelector('.guess').value);
	console.log(guess, typeof guess)
	if (!guess) {
		document.querySelector('.message').textContent = '⛔️ No number!';
	} else if (guess === secretNumber) {
		document.querySelector('.message').textContent = 'Correct Number!';

	} else if (guess > secretNumber) {
		if (score > 1) {
			document.querySelector('.message').textContent = 'Too high!';
			decreaseScore();
			document.querySelector('.score').textContent = score;
		} else {
			document.querySelector('.message').textContent = 'You lost the game!';
			document.querySelector('.score').textContent = 0;
		}
	} else if (guess < secretNumber) {
		if (score > 1) {
			document.querySelector('.message').textContent = 'Too low!';
			decreaseScore();
			document.querySelector('.score').textContent = score;
		} else {
			document.querySelector('.message').textContent = 'You lost the game!';
			document.querySelector('.score').textContent = 0;
		}
	}
});

//////////////////////////////////////
// Implementando la logica del juego

