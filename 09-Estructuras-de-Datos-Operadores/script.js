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