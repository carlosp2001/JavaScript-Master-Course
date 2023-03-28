'use strict';

////////////////////////////////////////////////
// Funciones constructoras y el operador new

// Ejemplo de funcion constructora
const Person = function (firstName, birthYear) {
	// Propiedades de la instancia
	this.firstName = firstName;
	this.birthYear = birthYear;

	// Never create a method inside constructor function
	// this.calcAge = function () {
	// 	console.log(2037 - this.birthYear);
	// };
	console.log(this);
}

const jonas = new Person('Jonas', 1991);
console.log(jonas.firstName);

// 1. New {} (Empty Object) is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically returns {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);

console.log(matilda, jack);

const jay = 'Jay';

console.log(jonas instanceof Person);
console.log(jay instanceof Person);