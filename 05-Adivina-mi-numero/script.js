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

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
console.log(secretNumber);

const decreaseScore = () => {
	score--;
	console.log(score);
}

document.querySelector('.check').addEventListener('click', () => {
	const guess = Number(document.querySelector('.guess').value);
	// console.log(guess, typeof guess)


	// Cuando no hay una entrada
	if (!guess) {
		document.querySelector('.message').textContent = '⛔️ No number!';

		// Cuando el jugador gana
	} else if (guess === secretNumber) {
		document.querySelector('.message').textContent = 'Correct Number!';
		document.querySelector('.number').textContent = secretNumber;
		document.querySelector('body').style.backgroundColor = '#60b347';

		document.querySelector('.number').style.width = '30rem';

		// Cuando el numero es demasiado alto
	} else if (guess > secretNumber) {
		if (score > 1) {
			document.querySelector('.message').textContent = 'Too high!';
			decreaseScore();
			document.querySelector('.score').textContent = score;
		} else {
			document.querySelector('.message').textContent = 'You lost the game!';
			document.querySelector('.score').textContent = 0;
		}

		// Cuando el numero es demasiado alto
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

//////////////////////////////////////
// Manipulando estilos css

/////////////////////////////////////
// Coding Challenge #1

/*

Implement a game rest functionality, so that the player can make a new guess!
Your tasks:
1. Select the element with the again class and attach a click event handler 2. Inthehandlerfunction,restoreinitialvaluesofthe'score'and
'secretNumber' variables
3. Restoretheinitialconditionsofthemessage,number,scoreandguessinput
fields
4. Alsorestoretheoriginalbackgroundcolor(#222)andnumberwidth(15rem)
GOOD LUCK 😀
 */

document.querySelector('.again').addEventListener('click', () => {
	score = 20;
	secretNumber = Math.trunc(Math.random() * 20) + 1;
	document.querySelector('.score').textContent = score;
	document.querySelector('.message').textContent = 'Start guessing...';
	document.querySelector('.guess').value = '';
	document.querySelector('body').style.backgroundColor = '#222';
	document.querySelector('.number').textContent = '?';
	document.querySelector('.number').style.width = '15rem';
})





