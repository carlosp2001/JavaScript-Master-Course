'use strict';

// Data needed for a later exercise
const flights =
	'_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
	name: 'Classico Italiano',
	location: 'Via Angelo Tavanti 23, Firenze, Italy',
	categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
	starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
	mainMenu: ['Pizza', 'Pasta', 'Risotto'],

	order: function (starterIndex, mainIndex) {
		return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
	},

	openingHours: {
		thu: {
			open: 12,
			close: 22,
		},
		fri: {
			open: 11,
			close: 23,
		},
		sat: {
			open: 0, // Open 24 hours
			close: 24,
		},
	},

	orderDelivery: function ({starterIndex = 1, mainIndex = 0, time = '20:00', address}) {
		console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered 
		Dto ${address} at ${time}`);
	},

	orderPasta: function (ing1, ing2, ing3) {
		console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
	},

	orderPizza: function (mainIngredient, ...otherIngredients) {
		console.log(mainIngredient);
		console.log(otherIngredients);
	}
};

restaurant.orderDelivery({
	time: '22:30',
	address: 'Via del Sole, 21',
	mainIndex: 2,
	starterIndex: 2
});

restaurant.orderDelivery({
	address: 'Via del Sole, 21',
	starterIndex: 2
})

/////////////////////////////////////
// Desestructuración de arreglos

const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// De esta forma obtenemos y declaramos los valores del array en variables de forma optima
const [x, y, z] = arr;
console.log(x, y, z);

// Saltarse un valor del objeto
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// Intercambiar valores de variables

// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

[main, secondary] = [secondary, main];
console.log(main, secondary)

// Recibir dos valores en return de una funcion
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// Arrays anidados
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);

// Desestructuración profunda
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

////////////////////////////////////
// Desestructuración de objetos

const {name, openingHours, categories} = restaurant;
console.log(name, openingHours, categories);

// Asignarle nuevos nombres a las variables que obtenemos mediante la desestructuracion
const {name: restaurantName, openingHours: hours, categories: tags} = restaurant;
console.log(restaurantName, hours, tags);

// Default values en desestructuracion
const {menu = [], starterMenu: starters = []} = restaurant;
console.log('\n', menu, starters);

// Mutando variables
let a1 = 1;
let b1 = 999;
const obj = {a1: 23, b1: 7, c1: 14};

// Para obtener los valores de variables previamente declaradas hacemos uso de los parentesis, esto para declarar que no
// es un bloque de codigo el que estamos usando
({a1, b1} = obj);


// Desestructuración de objetos anidados
const {fri: {open: o, close: cl}} = openingHours;
console.log(o, cl);


////////////////////////////////////////
// Operador de propagacion / Spread Operator

const arr1 = [7, 8, 9];
const badNewArr = [1, 2, arr1[0], arr1[1], arr1[2]];
// Forma manual de hacerlo
console.log(badNewArr);

// Usando el operador de propagacion/ Spread Operator
const newArr = [1, 2, ...arr1]
console.log(newArr);

// Imprimir individualmente los valores de un array
console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Funciones principales del operador de propagacion
const mainMenuCopy = [...restaurant.mainMenu];

// Unir 2 arreglos / join 2 arrays
const menuJ = [...restaurant.starterMenu ,...restaurant.mainMenu];
console.log(menuJ);

// Que son los iterables? Son cosas como todos los arreglos, cadenas, mapas o conjuntos, pero no los objetos

// Iterables: arrays, cadenas, maps, conjuntos (sets). NO Objetos
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);

// Real world - example
// const ingredients = [prompt('Let\'s make pasta! Ingredient 1?'),
// 	prompt('Ingredient 2?'),
// 	prompt('Ingredient 3?')];

const ingredients = ['Tomatoes',
	'Jam',
	'Cheese']
console.log(ingredients);

// Forma manual
restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

// Usando el operador de propagación
restaurant.orderPasta(...ingredients);

// Objetos: En los objetos al usar este operador simplemente agregamos las propiedades nuevas que declaramos
const newRestaurant = {founding: 1998, ...restaurant, founder: 'Guiseppe'};
console.log(newRestaurant);

const restaurantCopy = {...restaurant};
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);

//////////////////////////////////////////
// Patron de descanso y parametros

/// 1) DESESTRUCTURACION

// El patron de descanso es similar al operador de propagacion por lo tanto tienen la misma sintaxis con los tres puntos
// pero en realidad hace lo contrario del operador de propagacion

// PROPACION / SPREAD, porque esta en lado derecho de =
const arr2 = [1, 2, ...[3,4]]

// DESCANSO / REST, porque esta en lado izquierdo de =
const [a2, b3, ...others] = [1, 2, 3, 4, 5]

// Ejemplo usando ambos operadores, el operador de descanso debe ser el ultimo
const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(pizza, risotto, otherFood);
console.log(pizza, risotto, otherFood);

// Objetos / Usando el operador de descanso en objetos
const {sat, ...weekdays} = restaurant.openingHours;
console.log(weekdays);

/// 2) Funciones
const add = function (...numbers) {
	let sum = 0;
	for (let i = 0; i<numbers.length; i++) sum += numbers[i];
	console.log(sum);
}
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x1 = [23, 5, 7];
// Usando el operador de propagacion para enviar los parametros y recibiendolos con el operador de descanso en la
// funcion
add(...x1);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');


////////////////////////////////////////
// Short Cirtuiting (&& y ||)

console.log('-----------OR----------');
// Usan cualquier tipo de dato, puede retornar cualquier tipo de dato, evaluacion de cortocircuito
// Si el primer valor es truthy value retornara ese de lo contrario evaluara el siguiente valor
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ?? 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10
console.log(guests2);

console.log('-----------AND----------');
// En la evaluacion de cortocircuito el operador AND evaluara y cuando encuentre el primer valor falsy lo retornara
console.log(0 && 'Jonas');
console.log(7 && 'Jonas');

console.log('Hello' && 23 && null && 'jonas');

// Ejemplo practico
if (restaurant.orderPizza) {
	restaurant.orderPizza('mushrooms', 'spinach')
}

// Primeramente evalúa si la la funcion existe y si existe pues hace el llamado
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');