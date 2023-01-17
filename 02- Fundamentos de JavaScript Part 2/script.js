'use strict';

let hasDriversLicense = false;
const passTest = true;

// if (passTest) hasDriverLicense = true; // Probar el strict mode
if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log('I can drive :D');

// const interface = 'Audio'; // Palabra interface reservada

///////////////////////////////////
// Funciones

// Una funcion es simplemente un fragmento de codigo que podemos reutilizar una y otra vez

function logger() {
	console.log('My name is Jonas');
}

// Calling / running / invoking function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
	console.log(apples, oranges);
	const juice = `Juice with ${apples} apples and ${oranges} oranges`;
	return juice;

}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);
// console.log(fruitProcessor(5, 0));

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

// Built-in funcion ejemplo

const num = Number('23');


//////////////////////////////////////////////
// Declaraciones de funciones vs expresiones

// Declaracion de funcion / Function Declaration
function calcAge1(birthYear) {
	return 2037 - birthYear;
}

const age1 = calcAge1(1991);
console.log(age);

// Expresion de funcion / Otro tipo de funcion que existe / Funcion Anonima
// No podemos llamarla antes de declararla mientras que en la declaracion de funcion si
// funciona un llamado antes
// Es preferible usar expresiones de funciones

const calcAge2 = function (birthYear) {
	return 2037 - birthYear;
}

const age2 = calcAge2();

console.log(age1, age2);

////////////////////////////////////////////////
// Funcion flecha / Arrow Function

// Funcion flecha / arrow function
// La flecha funcion tiene una diferencia en comparacion de las demas y es que no obtiene una
// de las llamadas esta palabra clave

const calcAge4 = birthYear => 2037 - birthYear;
const age4 = calcAge4(1991);
console.log(age4);

const yearsUntilRetirement = (birthYear, firstName) => {
	const age = 2037 - birthYear;
	const retirement = 65 - age;

	return `${firstName} retires in ${retirement} years`;
}

console.log(yearsUntilRetirement(1991, 'Carlos'));
console.log(yearsUntilRetirement(1991, 'Carlos'));






