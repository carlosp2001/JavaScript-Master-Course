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

////////////////////////////////////////////
// Funciones llamando a otras funciones

function cutFruitPieces(fruit) {
	return fruit * 4;
}

function fruitProcessor1(apples, oranges) {
	const applePieces = cutFruitPieces(apples);
	const orangePieces = cutFruitPieces(oranges)
	return `Juice with ${applePieces} piece of apples and ${orangePieces} piece of oranges`;

}

console.log(fruitProcessor(2, 3));


//////////////////////////////////////////////////
// Coding Challenge #1

/* Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.
	Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
A team only wins if it has at least double the average score of the other team. Otherwise, no team wins!
	Your tasks:
	1. Createanarrowfunction'calcAverage'tocalculatetheaverageof3scores
2. Usethefunctiontocalculatetheaverageforbothteams
3. Createafunction'checkWinner'thattakestheaveragescoreofeachteam
as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner to the console, together with the victory points, according to the rule above. Example: "Koalas win (30 vs. 13)"
4. Usethe'checkWinner'functiontodeterminethewinnerforbothData1and Data 2
5. Ignoredrawsthistime
Test data:
	§ Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49 § Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27
Hints:
	§ To calculate average of 3 values, add them all together and divide by 3
§ To check if number A is at least double number B, check for A >= 2 * B.
	Apply this to the team's average scores 😉*/

const calcAverage = (a, b, c) => (a + b + c) / 3;
console.log(calcAverage(3, 4, 5));

// Test 1
let scoreDolphins = calcAverage(44, 23, 71);
let scoreKoalas = calcAverage(65, 54, 49);
console.log(scoreDolphins, scoreKoalas);

const checkWinner = function (avgDolphins, avgKoalas) {
	if (avgDolphins >= 2 * avgKoalas) {
		console.log(`Dolphins win (${avgDolphins})`);
	} else if (avgKoalas >= 2 * avgDolphins) {
		console.log(`Koalas win (${avgKoalas}) vs ${avgDolphins})`);
	} else {
		console.log('No team wins...')
	}
}

checkWinner(scoreDolphins, scoreKoalas);
checkWinner(576, 111);

// Test 2
scoreDolphins = calcAverage(85, 54, 41);
scoreKoalas = calcAverage(23, 34, 27);
console.log(scoreKoalas, scoreDolphins);
checkWinner(scoreDolphins, scoreKoalas);

///////////////////////////////////////////
// Estructuras de datos

// Arrays

const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);

// Otra forma de crear arrays

const years = new Array(1991, 1984, 2008, 2020);

console.log(friends[2]);

console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[2] = 'Jay';
console.log(friends);
// No se puede declarar nuevamente un array, ya que está declarado como const pero si puedes
// cambiar un elemento del array ya que este no se considera primitivo
// friends = ['Bob', 'Alice']

const firstName = 'Jonas';
const jonas = ['Jonas', 'Schmedtmann', 2037 - 1991, 'teacher', friends];
console.log(jonas);
console.log(jonas.length);

// Exercise
const calcAgeArrays = function (birthYear) {
	return 2037 - birthYear;
}

const y = [1990, 1967, 2002, 2010, 2018];

// console.log(calcAgeArrays(y))
const ageA1 = calcAgeArrays(years[0]);
const ageA2 = calcAgeArrays(years[1]);
const ageA3 = calcAgeArrays(years[years.length - 1]);
console.log(ageA1, ageA2, ageA3);

const ages = [calcAgeArrays(years[0]), calcAgeArrays(years[1]), calcAgeArrays(years[years.length - 1])];

console.log(ages);

/////////////////////////////////////
// Operaciones basicas con arrays

// Funciones integradas

const friends1 = ['Michael', 'Steven', 'Peter'];

// Push agrega elementos al final del array
// Push nos puede devolver el valor nuevo del length del array
const newLength = friends1.push('Jay');
console.log(friends1);
console.log(newLength);

// Unshift funciona para agregar elementos al principio del arreglo, tambien nos devuelve el tamaño del arreglo
friends1.unshift('Carlos')

// Eliminar elementos
// Pop: Elimina el ultimo elemento del arreglo
const popped = friends1.pop(); // Nos devuelve el elemento eliminado

friends1.shift(); // Eliminar el primer elemento del arreglo
console.log(friends1);

// indexOf nos devuelve el indice donde esta el elemento que buscamos
console.log(friends1.indexOf('Steven'));
console.log(friends1.indexOf('Bob')); // Si el elemento que buscamos no existe nos devuelve un -1

friends1.push(23);
// includes nos devuelve true or false si existe el elemento en el array
console.log(friends1.includes('Steven')); // true
console.log(friends1.includes('Bob')); // false
console.log(friends1.includes('23'));// nos devolvera falso porque funciona de manera estricta, no existe coercion de
// tipo

if (friends1.includes('Steven')) {
	console.log('You have a friend called Steven');
}





