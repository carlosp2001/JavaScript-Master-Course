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

//////////////////////////////////////
// Palabra clave this

console.log(this);

const calcAge1 = function (birthYear) {
	console.log(2037 - birthYear);
	console.log(this);
}

calcAge1(1991);

const calcAgeArrow = (birthYear) => {
	console.log(2037 - birthYear);
	console.log(this);
}

calcAgeArrow(1991);

const jonas = {
	year: 1991,
	calcAge: function () {
		console.log(this);
		console.log(2037 - this.year)
	}
};

jonas.calcAge();

const matilda = {
	year: 2017
};

matilda.calcAge = jonas.calcAge;
matilda.calcAge();

const f = jonas.calcAge;
f(); // Esta llamada nos devuelve el valor indefinido ya que es un llamado de funcion regular

///////////////////////////////////////////
// Funciones regulares vs funcion flecha

var firstName = "Matilda";

const jonasFunc = {
	firstName: 'Jonas',
	year: 1991,
	calcAge: function () {
		// Esta es la solucion para el llamado regular a una funcion, sería con el uso de this fuera y despues usando la
		// variable self

		// Solucion 1
		// const self = this;
		// console.log(this);
		// console.log(2037 - this.year);
		// const isMillennial = function () {
		// 	// console.log(this.year >= 1981 && this.year <= 1996); // Nos retornara indefinido ya que el llamadp a la
		// 	// funcion es regular, por lo tanto no tiene palabra clave this, aunque ocurra dentro de un metodo
		// 	console.log(self);
		// 	console.log(self.year >= 1981 && self.year <= 1996);
		// };

		// Solucion 2 con funcion flecha
		const isMillennial = () => {
			// console.log(this.year >= 1981 && this.year <= 1996); // Nos retornara indefinido ya que el llamadp a la
			// funcion es regular, por lo tanto no tiene palabra clave this, aunque ocurra dentro de un metodo
			console.log(this);
			console.log(this.year >= 1981 && this.year <= 1996);
		};

		isMillennial();
	},
	// Al ser una funcion flecha no tiene palabra clave this, sino que hereda de su alcance padre, por lo que busca en
	// el contexto global pero no encuentra ninguna variable llamada firstName
	// greet: () => console.log(`Hey ${this.firstName}`)

	// el problema se soluciona al usar una funcion regular
	greet: function () {
		console.log(`Hey ${this.firstName}`)
	}
};

jonasFunc.greet();
jonasFunc.calcAge();

const addExpr1 = function (a, b) {
	return a + b;
}
addExpr1(2, 5);

// La palabra arguments solo existe en funciones regulares en expresiones de funcion
var addArrow1 = (a, b) => {
	console.log(arguments)
	return a + b
};

addArrow1(2, 5, 8);