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
	?? Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49 ?? Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27
Hints:
	?? To calculate average of 3 values, add them all together and divide by 3
?? To check if number A is at least double number B, check for A >= 2 * B.
	Apply this to the team's average scores ????*/

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
// No se puede declarar nuevamente un array, ya que est?? declarado como const pero si puedes
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

// Unshift funciona para agregar elementos al principio del arreglo, tambien nos devuelve el tama??o del arreglo
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

/////////////////////////////////////////////
// Coding Challenge #2

/*Steven is still building his tip calculator, using the same rules as before: Tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.
Your tasks:
	1. Writeafunction'calcTip'thattakesanybillvalueasaninputandreturns the corresponding tip, calculated based on the rules above (you can check out the code from first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100
2. Andnowlet'susearrays!Socreateanarray'bills'containingthetestdata below
3. Createanarray'tips'containingthetipvalueforeachbill,calculatedfrom the function you created before
4. Bonus:Createanarray'total'containingthetotalvalues,sothebill+tip Test data: 125, 555 and 44
Hint: Remember that an array needs a value in each position, and that value can actually be the returned value of a function! So you can just call a function as array values (so don't store the tip values in separate variables first, but right in the new array) ????Steven is still building his tip calculator, using the same rules as before: Tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.
Your tasks:
	1. Writeafunction'calcTip'thattakesanybillvalueasaninputandreturns the corresponding tip, calculated based on the rules above (you can check out the code from first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100
2. Andnowlet'susearrays!Socreateanarray'bills'containingthetestdata below
3. Createanarray'tips'containingthetipvalueforeachbill,calculatedfrom the function you created before
4. Bonus:Createanarray'total'containingthetotalvalues,sothebill+tip Test data: 125, 555 and 44
Hint: Remember that an array needs a value in each position, and that value can actually be the returned value of a function! So you can just call a function as array values (so don't store the tip values in separate variables first, but right in the new array) ????*/

// const calcTipA = function (bill) {
// 	return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
// }

const calcTipA = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

const bills = [125, 555, 44];
const tips = [calcTipA(bills[0]), calcTipA(bills[1]), calcTipA(bills[2])];
const totals = [bills[0] + tips[1], bills[1] + tips[1], bills[2] + tips[2]];
console.log(bills, tips, totals);

/////////////////////////////////////
// Introduccion a objetos


const jonasArray = [
	'Jonas',
	'Shmedtmann',
	2037 - 1991,
	'teacher',
	['Michael', 'Peter', 'Steven']
];

const jonasO = {
	firstName: 'Jonas',
	lastName: 'Schmedtmann',
	age: 2037 - 1991,
	job: 'teacher',
	friends: ['Michael', 'Peter', 'Steven']
}

console.log(jonasO);
// Obtener la propiedad de un objeto
console.log(jonasO.lastName);
// Otra forma
console.log(jonasO['lastName']);

const nameKey = 'Name';
console.log(jonasO['first' + nameKey]);
console.log(jonasO['last' + nameKey]);

const interestedIn = prompt('What do you want to know about Jonas? Choose between firstName lastName, age, job and friends');

if (jonasO[interestedIn]) {
	console.log(jonas[interestedIn]);
} else {
	console.log('Wrong request! Choose between firstName, lastName, age, job and friends')
}

// Agregar propiedades al objeto
jonasO.location = 'Portugal';
jonasO['twitter'] = '@jonasschedtmann';
console.log(jonasO);

// Challenge
// Jonas has 3 friends, and his best friends is called Michael

console.log(`${jonasO.firstName} has ${jonasO.friends.length} friends, and his best friends is called ${jonasO.friends[0]}`);

////////////////////////////////////
// Metodos de objeto

const jonas1 = {
	firstName: 'Jonas',
	lastName: 'Schmedtmann',
	birthYear: 1991,
	job: 'teacher',
	friends: ['Michael', 'Peter', 'Steven'],
	hasDriversLicense: true,
	// calcAge: function (birthYear) {
	// 	return 2037 - birthYear
	// }

	// Usando la funcion this para usar la propiedad de jonas1, con el uso de this podemos automatizar al momento de
	// querer cambiar el nombre a la propiedad
	// calcAge: function () {
	// 	return 2037 - this.birthYear
	// }

	// Agregar una nueva propiedad mediante this
	calcAge: function () {
		this.age = 2037 - this.birthYear;
		return this.age;
	},

	getSummary: () => {
		return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he ${hasDriversLicense ? 'has' : 'has not'} a
		driver license`;
	}
}

// Sintaxis para llamar a la funcion dentro del objeto
// console.log(jonas1.calcAge(1991));
// console.log(jonas1['calcAge'](1991));


console.log(jonas1['calcAge']());
console.log(jonas1.age);
console.log(jonas1.getSummary())

// Challenge
// "Jonas is a 46-year old teacher, and he has a driver license";


//////////////////////////////////////////
// Coding Challenge #3

/*Let's go back to Mark and John comparing their BMIs! This time, let's use objects to implement the calculations! Remember: BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter)
Your tasks:
	1. Foreachofthem,createanobjectwithpropertiesfortheirfullname,mass,and height (Mark Miller and John Smith)
2. Createa'calcBMI'methodoneachobjecttocalculatetheBMI(thesame method on both objects). Store the BMI value to a property, and also return it from the method
3. LogtotheconsolewhohasthehigherBMI,togetherwiththefullnameandthe respective BMI. Example: "John's BMI (28.3) is higher than Mark's (23.9)!"
Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
	GOOD LUCK */

const mark = {
	fullName: 'Mark Miller',
	mass: 78,
	height: 1.69,
	calcBMI: function () {
		this.bmi = this.mass / this.height ** 2;
		return this.bmi;
	}
};
const john = {
	fullName: 'John Smith',
	mass: 92,
	height: 1.95,
	calcBMI: function () {
		this.bmi = this.mass / this.height ** 2;
		return this.bmi;
	}
};

mark.calcBMI();
john.calcBMI();
console.log(mark.bmi, john.bmi);

if (mark.bmi > john.bmi) {
	console.log(`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s BMI (${john.bmi})`);
} else if (mark.bmi < john.bmi) {
	console.log(`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s BMI (${mark.bmi})`);
}

///////////////////////////////
// Iteracion: El for loop

console.log('Lifting weights repetition 1');
console.log('Lifting weights repetition 2');
console.log('Lifting weights repetition 3');
console.log('Lifting weights repetition 4');
console.log('Lifting weights repetition 5');
console.log('Lifting weights repetition 6');
console.log('Lifting weights repetition 7');

// Iterador for loop, el for loop se mantiene corriendo mientras sea verdadera / true
for (let rep = 1; rep <= 10; rep++) {
	console.log(`Lifting weights repetition ${rep}`);
}

///////////////////////////////////////////
// Loop en arreglos, break and continue

const jonasArray = [
	'Jonas',
	'Shmedtmann',
	2037 - 1991,
	'teacher',
	['Michael', 'Peter', 'Steven'],
	true
];

const types = [];

for (let i = 0; i < jonasArray.length; i++) {
	console.log(jonasArray[i], typeof jonasArray[i])

	// Llenando un array de tipos
	// types[i] = typeof jonasArray[i];
	types.push(typeof jonasArray[i])
}

types[0] = 'string';

console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
	ages.push(2037 - years[i]);
}
console.log(ages);

// continue y break
// continue se salta a la siguiente iteracion y break se sale de la iteracion y continua con el
// codigo
console.log('------ONLY-STRINGS-------');
for (let i = 0; i < jonasArray.length; i++) {
	if (typeof jonasArray[i] !== 'string') continue;

	console.log(jonasArray[i], typeof jonasArray[i])
}

console.log('------BREAK WITH NUMBER-------');
for (let i = 0; i < jonasArray.length; i++) {
	if (typeof jonasArray[i] === 'number') continue;
	console.log(jonasArray[i], typeof jonasArray[i])
}

/////////////////////////////////
// Loops en reversa y loops dentro de otros loops

const jonas2 = [
	'Jonas',
	'Shmedtmann',
	2037 - 1991,
	'teacher',
	['Michael', 'Peter', 'Steven'],
	true
];

// 0, 1 ....4
// 4, 3, 2 ...0

for (let i = jonasArray.length - 1; i >= 0; i--) {
	console.log(i, jonasArray[i])
}

// Loop inside of a loop

for (let exercise = 1; exercise < 4; exercise++) {
	console.log(`------------ Starting exercise ${exercise} ------------`);

	for (let rep = 1; rep < 6; rep++) {
		console.log(`Exercise ${exercise}: Lifting weight repetition ${rep}`);
	}
}

////////////////////////////////
// While loop

let rep = 1;
while (rep <= 10) {
	console.log(`WHILE: Lifting weights repetition ${rep}`);
	rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice);

while (dice !== 6) {
	console.log(`You rolled a ${dice}`);
	dice = Math.trunc(Math.random() * 6) + 1;
	if (dice === 6) console.log('Loop is about to end...');
}

////////////////////////////////
// Coding Challenge #4

/* Let's improve Steven's tip calculator even more, this time using loops!
	Your tasks:
	1. Create an array 'bills' containing all 10 test bill values
2. Create empty arrays for the tips and the totals ('tips' and 'totals')
3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate tips and total values (bill + tip) for every bill value in the bills array. Use a for loop to perform the 10 calculations!
	Test data: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52
Hints: Call ???calcTip ???in the loop and use the push method to add values to the
tips and totals arrays ???? Bonus:
	4. Bonus:Writeafunction'calcAverage'whichtakesanarraycalled'arr'as an argument. This function calculates the average of all numbers in the given array. This is a difficult challenge (we haven't done this before)! Here is how to solve it:
4.1. First, you will need to add up all values in the array. To do the addition, start by creating a variable 'sum' that starts at 0. Then loop over the array using a for loop. In each iteration, add the current value to the 'sum' variable. This way, by the end of the loop, you have all values added together
4.2. To calculate the average, divide the sum you calculated before by the length of the array (because that's the number of elements)
4.3. Call the function with the 'totals' array
GOOD LUCK */

const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for (let i = 0; i < bills.length; i++) {
	const tip = calcTip(bills[i]);
	tips.push(tip);
	totals.push(tip + bills[i]);
}

console.log(bills, tips, totals);

const calcAverage1 = function (arr) {
	let sum = 0;
	for (let i = 0; i < arr.length; i++) {
		// sum = sum + arr[i];
		sum += arr[i];
	}
	console.log(sum);
	return sum / arr.length;
}

console.log(calcAverage1([2, 3, 7]));
console.log(calcAverage1(totals));
console.log(calcAverage1(tips));