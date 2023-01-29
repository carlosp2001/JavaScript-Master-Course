'use strict';

function calcAge(birthYear) {
	const age = 2037 - birthYear;

	function printAge() {
		let output = `${firstName}, you are ${age}, born in ${birthYear}`;
		console.log(output);

		if (birthYear >= 1981 && birthYear <= 1996) {
			var millenial = true;
			// Creating NEW variable with same name as outer scope's variable
			const firstName = 'Steven';

			// Reassigning outer scope variable
			output = "New output";
			// Las variables var tienen alcance de funcion por lo que se pueden usar fuera del bloque
			const str = `Oh, and you're a millenial, ${firstName}`;
			console.log(str);

			function add(a, b) {
				return a + b;
			}

		}
		// console.log(str);
		console.log(millenial);
		add(2, 3);
		console.log(output)

	}

	printAge();
	return age;
}

const firstName = 'Jonas';
calcAge(1991);
console.log(age);

////////////////////////////////////
// Elevacion (Hoisting y TDZ)

// Elevacion con variables
console.log(me);
console.log(job);
console.log(year);

var me = 'Jonas';
let job = 'Teacher';
const year = 1991;

// Elevacion con funciones
console.log(addDecl(2, 3));
console.log(addExpr(2, 3));
console.log(addArrow(2, 3));

// Al ser una funcion declarada en una variable entra automaticamente en la temporal dead zone (TDZ)
// Al declararse con var las funciones se vuelven un valor undefined

function addDecl(a, b) {
	return a + b;
}

const addExpr = function (a, b) {
	return a + b;
}

var addArrow = (a, b) => a + b;

// Example
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
	console.log('All products deleted');
}

var z = 1;
let y = 2;
const z = 3;

// Comparamos si la propiedad x declarada con var es un objeto que se encuentra en la ventana (window)

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);
