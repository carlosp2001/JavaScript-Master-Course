let js = "amazing";
// if (js === "amazing") alert("JavaScript es divertido");

40 + 8 + 23 - 10;
console.log(40 + 8 + 23 - 10);

// Valores y variables
// Valor es un pedazo de dato es la unidad de información más fundamental que tenemos en programacion / JavaScript

// Valores
console.log('Jonas');
console.log('23');

// Variables almacenamos los valores para poderlos utilizar una y otra vez

let firstName = "Jonas";

// Usamos la variable
console.log(firstName);
console.log(firstName);
console.log(firstName);

// Reglas para nombrar variables
//
// - Principalmente usar camelCase
// - No usar letras en el principio del nombre de la variable
// - El nombre solo puede contener numeros, letras, guiones bajos o el signo de dolar

let jonas_matilda = "JM";

// Las constantes estan nombradas en mayusculas

let PI = 3.1415;

let myFirstJob = 'Programmer';
let myCurrentJob = 'Teacher';

let job1 = 'Programmer';
let job2 = 'teacher';

console.log(myFirstJob);

// Tipos de datos

console.log(true);
let javaScriptIsFun = true;
console.log(javaScriptIsFun);

// Uso de typeof / se utiliza para saber el tipo de dato que es

console.log(typeof true);
console.log(typeof javaScriptIsFun);
console.log(typeof 23);
console.log(typeof 'Jonas');

javaScriptIsFun = 'YES!';
console.log(typeof javaScriptIsFun);

// Valor undefined

let year;
console.log(year);
console.log((typeof year));

year = 1991;
console.log(typeof year);

// El valor null se considera un error, un error que nunca se corrige por razones heredadas
console.log(typeof null);


// Let, const y var

let age = 30;
age = 31;

// Declaramos una variable constante / inmutable
const birthYear = 1991;

// Necesitamos declarar un valor inicial en una constante
// const job;

var job = 'programmer';
job = 'teacher';


// Operadores

// Operadores matematicos

const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah);

// Multiplicación / Division / Operador de Exponente
console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);

// Operador + podemos concatenar cadenas
const firstName = 'Jonas';
const lastName = 'Schmedtmann';
console.log(firstName + ' ' + lastName);

// Operador typeof se usa para conocer el tipo de valor


// Operadores de asignacion
let x = 10 + 5;
x += 10; // x = x + 10 = 25
x *= 4; // x = x * 4 = 100
x /= 2; // x = x * 4 = 50
x++; // Operador de incremento
x--; // Operador de decremento
console.log(x);

// Operadores de comparación
console.log(ageJonas > ageSarah); // result boolean true <, >, >=, <=
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;
console.log(now - 1991 > now - 2018);


// Precedencia de ooperadores: Basicamente es el orden con el cual los operadores se ejecutan
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);
console.log(25 - 10 - 5);

let x, y;
x = y = 25 - 10 - 5; // x = y = 10, x = 10
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2; // Utilizando el operador de agrupacion () paréntesis
console.log(ageJonas, ageSarah, averageAge);

////////////////////////////////////////
// Coding challenge #1

/*Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula:
	BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter).
Your tasks:
	1. StoreMark'sandJohn'smassandheightinvariables
2. CalculateboththeirBMIsusingtheformula(youcanevenimplementboth
versions)
3. CreateaBooleanvariable'markHigherBMI'containinginformationabout
whether Mark has a higher BMI than John.
	Test data:
	§ Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
§ Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.
	GOOD LUCK*/

// #1 Almacenar el peso y altura de Mark y John en variables
const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

// #2 Calcular el BMI de ambos (implementando diferentes versiones de la formula)
const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / (heightJohn * heightJohn);

// #3 Crear variable booleana si Mark tiene bmi mas alto que John
const markHigherBMI = BMIMark > BMIJohn;

console.log(BMIMark, BMIJohn, markHigherBMI);

// Strings y plantillas literales

const firstName = 'Jonas';
const job = 'teacher';
const birthYear = 1991;
const year = 2037;

const jonas = "I'm " + firstName + ', a ' + (year - birthYear) + ' years old ' + job + '!';
console.log(jonas);

const jonasNew = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;

console.log(`Just a regular string...`);

// Cadenas multilineas

console.log('String with \n\
multiplie \n\
lines');

// La nueva forma de hacerlo

console.log(`String with
 multiple 
 lines`);


// Estructuras de control
// Tomar decisiones if / else declaraciones

const age = 19;
const isOldEnough = age >= 18;

if (age >= 18) {
	console.log('Sarah can start driving license');
} else {
	const yearsLeft = 18 - age;
	console.log(`Sarah is too young. Waith another ${yearsLeft} years :)`);
}

const birthYear = 1998;
let century;
if (birthYear <= 2000) {
	// Cualquier variable que declaremos dentro del bloque sera accesible dentro del bloque.
	century = 20;
} else {
	century = 21;
}
console.log(century);

///////////////////////////////////
// Coding Challenge #2

/*Use the BMI example from Challenge #1, and the code you already wrote, and improve it.
	Your tasks:
	1. Printaniceoutputtotheconsole,sayingwhohasthehigherBMI.Themessage is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
2. UseatemplateliteraltoincludetheBMIvaluesintheoutputs.Example:"Mark's BMI (28.3) is higher than John's (23.9)!"
Hint: Use an if/else statement 😉 GOOD LUCK 😀*/


const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / (heightJohn * heightJohn);
console.log(BMIMark, BMIJohn);

if (BMIMark > BMIJohn) {
	console.log(`Mark's BMI(${BMIMark}) is higher than John's (${BMIJohn})!`);
} else {
	console.log(`John's BMI(${BMIJohn}) is higher than Mark's ${BMIMark}!`);
}


// Conversion de tipo y coercion de tipo
// Conversion nosotros manualmente convertimos un dato en otro tipo mientras que en la coercion de tipo JS
// automaticamente hace las conversiones

///////////////////////////////////////
// Conversion de tipo
const inputYear = '1991';
// Convertir strings en number value
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

console.log(Number('Jonas')); // Nos devuelve NaN, siempre devuelve el valor NaN todas las operaciones que se
// realizan con numeros pero no devuelve un numero
console.log(typeof NaN);

// Convertir de numero a string
console.log(String(23), 23);

//////////////////////////////////////
// Coercion de tipo
console.log('I am' + 23 + ' years old');
console.log('23' + '10' + 3); // En el caso del operador + convierte a los numeros en string
console.log('23' - '10' - 3); // En el caso del operador + convierte a los string en el numero
console.log('23' / '2'); // Convierte el string en numeros

let n = '1' + 1; // '11'
n = n - 1;
console.log(n);

///////////////////////////////////
// Valores falsy y truthy

// 5 valores falsy: 0, '', undefined, null, NaN

console.log(Boolean(0)); // False
console.log(Boolean(undefined)); // false
console.log(Boolean('Jonas')); // True
console.log(Boolean({})); // True
console.log(Boolean('')); // False

const money = 0;
if (money) {
	console.log("Don't spend it all");
} else {
	console.log("You should get a job");
}

let height;
if (height) {
	console.log('YAY! Height is a defined');
} else {
	console.log("Height is undefined")
}

//////////////////////////////////////
// Operadores de Igualdad

const age = 18;

// El operador === devolvera true si solo tienen el exactamente el mismo valor
if (age === 18) console.log('You are an adult');
if (age === '18') console.log('Coercion') // Devuleve false porque no son el mismo tipo de valor

// El operador == hace coercion de tipo por lo que sin importar si son strings nos devuelve true
if (age == '18') console.log('Coercion') // Devuleve false porque no son el mismo tipo de valor

const favourite = prompt("What's your favorite number?");
console.log(typeof favourite);

if (Number(favourite) === 23) { // 23 === 23
	console.log('Cool 23 is an amazing number')
} else if (favourite === 7) {
	console.log('7 is a cool number');
} else if (favourite === 9) {
	console.log('9 is also a cool number');
} else {
	console.log('Number is not 23 or 7 or 9');
}

if (favourite !== 23) console.log('Why not 23?');


//////////////////////////////////////////
// Operadores Lógicos

const hasDriversLicense = true; // A
const hasGoodVision = false; // B

console.log(hasDriversLicense && hasGoodVision); // false
console.log(hasDriversLicense || hasGoodVision); // true
console.log(!hasDriversLicense); // false

const shouldDrive = hasDriversLicense && hasGoodVision;

if (shouldDrive) {
	console.log('Sarah is able to drive!');
} else {
	console.log('Someone else should drive...');
}

const isTired = true; // C
console.log(hasDriversLicense || hasGoodVision || isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
	console.log('Sarah is able to drive!');
} else {
	console.log('Someone else should drive...');
}

/////////////////////////////////////////
// Coding Challenge #3

/*
There are two gymnastics teams, Dolphins and Koalas. They compete against each other 3 times. The winner with the highest average score wins a trophy!
Your tasks:
1. Calculatetheaveragescoreforeachteam,usingthetestdatabelow
2. Comparetheteam'saveragescorestodeterminethewinnerofthecompetition,
and print it to the console. Don't forget that there can be a draw, so test for that
as well (draw means they have the same average score)
3. Bonus1:Includearequirementforaminimumscoreof100.Withthisrule,a
team only wins if it has a higher score than the other team, and the same time a score of at least 100 points. Hint: Use a logical operator to test for minimum score, as well as multiple else-if blocks 😉
4. Bonus2:Minimumscorealsoappliestoadraw!Soadrawonlyhappenswhen both teams have the same score and both have a score greater or equal 100 points. Otherwise, no team wins the trophy
Test data:
§ Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
§ Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123 § Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106
GOOD LUCK
 */

// # 1
// const scoreDolphins = (96 + 108 + 89) / 3;
// const scoreKoalas = (88 + 91 + 110) / 3;
// console.log(scoreDolphins, scoreKoalas);
//
// if (scoreDolphins > scoreKoalas) {
// 	console.log('Dolphins win the trophy');
// } else if (scoreKoalas> scoreDolphins) {
// 	console.log('Koalas win the trophy');
// } else if (scoreDolphins === scoreKoalas) {
// 	console.log('Both win th trophy');
}

// BONUS 1
const scoreDolphins = (96 + 108 + 89) / 3;
const scoreKoalas = (88 + 91 + 110) / 3;
console.log(scoreDolphins, scoreKoalas);

if (scoreDolphins > scoreKoalas && scoreDolphins >= 100) {
	console.log('Dolphins win the trophy');
} else if (scoreKoalas > scoreDolphins && scoreKoalas >= 100) {
	console.log('Koalas win the trophy');
} else if (scoreDolphins === scoreKoalas && scoreKoalas >= 100 && scoreDolphins >= 100) {
	console.log('Both win th trophy');
} else {
	console.log('No one wins the trophy');
}
