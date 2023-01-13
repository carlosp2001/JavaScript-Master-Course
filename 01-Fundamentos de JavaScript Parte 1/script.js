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
x ++; // Operador de incremento
x --; // Operador de decremento
console.log(x);

// Operadores de comparación
console.log(ageJonas > ageSarah); // result boolean true <, >, >=, <=
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;
console.log(now - 1991 > now - 2018);

