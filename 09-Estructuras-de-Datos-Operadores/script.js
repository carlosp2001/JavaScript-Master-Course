"use strict";

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

const weekdays1 = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const openingHours = {
  // ES6 objeto literal mejorado
  [weekdays1[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays1[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays1[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  // ES6 objeto literal mejorado
  openingHours,

  // ES6 objeto literal mejorado
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = "20:00",
    address,
  }) {
    console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered 
		Dto ${address} at ${time}`);
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

restaurant.orderDelivery({
  time: "22:30",
  address: "Via del Sole, 21",
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: "Via del Sole, 21",
  starterIndex: 2,
});

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
console.log(main, secondary);

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

const { name, openingHoursObj, categories } = restaurant;
console.log(name, openingHoursObj, categories);

// Asignarle nuevos nombres a las variables que obtenemos mediante la desestructuracion
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Default values en desestructuracion
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log("\n", menu, starters);

// Mutando variables
let a1 = 1;
let b1 = 999;
const obj = { a1: 23, b1: 7, c1: 14 };

// Para obtener los valores de variables previamente declaradas hacemos uso de los parentesis, esto para declarar que no
// es un bloque de codigo el que estamos usando
({ a1, b1 } = obj);

// Desestructuración de objetos anidados
const {
  fri: { open: o, close: cl },
} = openingHours;
console.log(o, cl);

////////////////////////////////////////
// Operador de propagacion / Spread Operator

const arr1 = [7, 8, 9];
const badNewArr = [1, 2, arr1[0], arr1[1], arr1[2]];
// Forma manual de hacerlo
console.log(badNewArr);

// Usando el operador de propagacion/ Spread Operator
const newArr = [1, 2, ...arr1];
console.log(newArr);

// Imprimir individualmente los valores de un array
console.log(...newArr);

const newMenu = [...restaurant.mainMenu, "Gnocci"];
console.log(newMenu);

// Funciones principales del operador de propagacion
const mainMenuCopy = [...restaurant.mainMenu];

// Unir 2 arreglos / join 2 arrays
const menuJ = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menuJ);

// Que son los iterables? Son cosas como todos los arreglos, cadenas, mapas o conjuntos, pero no los objetos

// Iterables: arrays, cadenas, maps, conjuntos (sets). NO Objetos
const str = "Jonas";
const letters = [...str, " ", "S."];
console.log(letters);
console.log(...str);

// Real world - example
// const ingredients = [prompt('Let\'s make pasta! Ingredient 1?'),
// 	prompt('Ingredient 2?'),
// 	prompt('Ingredient 3?')];

const ingredients = ["Tomatoes", "Jam", "Cheese"];
console.log(ingredients);

// Forma manual
restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

// Usando el operador de propagación
restaurant.orderPasta(...ingredients);

// Objetos: En los objetos al usar este operador simplemente agregamos las propiedades nuevas que declaramos
const newRestaurant = { founding: 1998, ...restaurant, founder: "Guiseppe" };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = "Ristorante Roma";
console.log(restaurantCopy.name);
console.log(restaurant.name);

//////////////////////////////////////////
// Patron de descanso y parametros

/// 1) DESESTRUCTURACION

// El patron de descanso es similar al operador de propagacion por lo tanto tienen la misma sintaxis con los tres puntos
// pero en realidad hace lo contrario del operador de propagacion

// PROPACION / SPREAD, porque esta en lado derecho de =
const arr2 = [1, 2, ...[3, 4]];

// DESCANSO / REST, porque esta en lado izquierdo de =
const [a2, b3, ...others] = [1, 2, 3, 4, 5];

// Ejemplo usando ambos operadores, el operador de descanso debe ser el ultimo
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);
console.log(pizza, risotto, otherFood);

// Objetos / Usando el operador de descanso en objetos
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

/// 2) Funciones
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x1 = [23, 5, 7];
// Usando el operador de propagacion para enviar los parametros y recibiendolos con el operador de descanso en la
// funcion
add(...x1);

restaurant.orderPizza("mushrooms", "onion", "olives", "spinach");
restaurant.orderPizza("mushrooms");

////////////////////////////////////////
// Short Cirtuiting (&& y ||)

console.log("-----------OR----------");
// Usan cualquier tipo de dato, puede retornar cualquier tipo de dato, evaluacion de cortocircuito
// Si el primer valor es truthy value retornara ese de lo contrario evaluara el siguiente valor
console.log(3 || "Jonas");
console.log("" || "Jonas");
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || "" || "Hello" || 23 || null);

// restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ?? 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log("-----------AND----------");
// En la evaluacion de cortocircuito el operador AND evaluara y cuando encuentre el primer valor falsy lo retornara
console.log(0 && "Jonas");
console.log(7 && "Jonas");

console.log("Hello" && 23 && null && "jonas");

// Ejemplo practico
if (restaurant.orderPizza) {
  restaurant.orderPizza("mushrooms", "spinach");
}

// Primeramente evalúa si la la funcion existe y si existe pues hace el llamado
restaurant.orderPizza && restaurant.orderPizza("mushrooms", "spinach");

//////////////////////////////////////////////
// Operador de fusión nula

restaurant.numGuests = 0;
const guests3 = restaurant.numGuests || 10;
console.log(guests3);

// Nullish: null and undefined (NOT 0 or '')
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

/////////////////////////////////////////////
// Operadores de asignación lógica

const rest1 = {
  name: "Capri",
  //numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: "La Pizza",
  owner: "Giovanni Rossi",
};

// OR operador de asignación
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// nullish operador de asignación (null or undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND operador de asignación
rest1.owner = rest1.owner && "<ANONYMUS>";
rest2.owner = rest2.owner && "<ANONYMUS>";
rest1.owner &&= "<ANONYMUS>";
rest2.owner &&= "<ANONYMUS>";

console.log(rest1);
console.log(rest2);

/////////////////////////////////////////////
// Coding Challenge #1

/*
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
 */

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1.
const [players1, players2] = game.players;

// 2.
const [gk, ...fieldplayers] = players1;

// 3.
const allPlayers = [...players1, ...players2];

// 4.
const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];

// 5.
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

// 6.
const printGoals = function (...players) {
  console.log(`${players.length} goals were scored`);
};

printGoals("Davis", "Muller", "Lewandowski");
printGoals(...game.scored);

// 7.
team1 < team2 && console.log("Team 1 is more likely to win");
team1 > team2 && console.log("Team 2 is more likely to win");

///////////////////////////////////////////////
// For-of loop

const menu3 = [...restaurant.starterMenu, ...restaurant.mainMenu];

// El loop for-of recorre el array y nos devuelve cada objeto de este
for (const item of menu3) console.log(item);

// Para obtener el indice y el contenido de cada array, usamos desetructuracion en la iteracion para que nos devuelve
// el menu y el elemento
for (const [i, el] of menu3.entries()) console.log(`${i + 1}: ${el}`);

// console.log([...menu3.entries()]);

///////////////////////////////////////////////////////////
// Literales de objeto mejorado (Enhanced object literals)

///////////////////////////////////////////////////////////
// Encadenamiento Opcional (Optional Chaining)

// Queremos obtener la hora de apertura del objeto restaurante en dia Lunes
// Usando if
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);
if (restaurant.openingHours.fri) console.log(restaurant.openingHours.fri.open);

// Con Optional chaining
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

// Ejemplo

const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
for (const day of days) {
  console.log(day);
  const open = restaurant.openingHours[day]?.open ?? "closed";
  console.log(`On ${day}, we open at ${open}`);
}

// Metodos en encadenamiento opcional
console.log(restaurant.order?.(0, 1) ?? "Method does not exist");
console.log(restaurant.orderRisotto?.(0, 1) ?? "Method does not exist");

// Arrays
const users = [
  {
    name: "Jonas",
    email: "hello@jonas.io",
  },
];

console.log(users[0]?.name ?? "User array empty");

if (users.length > 0) console.log(users[0].name);
else console.log("User array empty");

//////////////////////////////////////////////////////////////
// Objetos Iteradores: Llaves de objetos, valores y entradas

// Recorriendo los nombres de las propiedades / keys
// Propiedad Nombres / keys
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;

for (const day of Object.keys(openingHours)) openStr += `${day}, `;
console.log(openStr);

// Propiedad Valores
const values = Object.values(openingHours);
console.log(values);

// Recorremos el objeto entero
const entries = Object.entries(openingHours);
console.log(entries);

for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}

///////////////////////////////////////
// Coding Challenge #2

/*
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

// 1.
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

// 2.
const odds = Object.values(game.odds);
let average = 0;
for (const odd of odds) average += odd;

average /= odds.length;
console.log(average);

// 3.
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === "x" ? "draw" : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr}... ${odd}`);
}

// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5

const scorers = {};
// Bonus
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);

//////////////////////////////////////////
// Sets / Conjuntos

// Un set o conjunto es una colección de valores únicos, eso significa que un set o conjunto no puede tener valores
// duplicados

const ordersSet = new Set([
  "Pasta",
  "Pizza",
  "Pizza",
  "Risotto",
  "Pasta",
  "Pizza",
]);
console.log(ordersSet);

console.log(new Set("Carlos"));

console.log(ordersSet.size);
console.log(ordersSet.has("Pizza"));
console.log(ordersSet.has("Bread"));
ordersSet.add("Garlic Bread");
ordersSet.add("Garlic Bread");
ordersSet.delete("Risotto");
// ordersSet.clear();
console.log(ordersSet);

// Sets son tambien iterables

for (const order of ordersSet) console.log(order);

// Example

const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(
  new Set(["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"]).size
);

// Cantidad de letras diferentes en una palabra
console.log(new Set("jonasschmedtmann").size);

////////////////////////////////////////////////
// Maps

const rest = new Map();
rest.set("name", "Classico Italiano");
rest.set(1, "Firenze, Italy");
console.log(rest.set(2, "Lisbon, Portugal"));

rest
  .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are open");

console.log(rest.get("name"));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
console.log(rest.get(time > rest.get("open") && time < rest.get("close")));

console.log(rest.has('categories'));
rest.delete(2);
console.log(rest);
console.log(rest.size);

// Eliminar todo el contenido del mapa
//rest.clear();
console.log(rest.size);

const arrRest = [1, 2]
rest.set(arrRest, 'Test');
// rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size);

console.log(rest.get(arrRest));

// Iteracion con mapas

const question = new Map([
    ['question', 'What is the best programming language in the world?'],
    [1, 'C'],
    [2, 'Java'],
    [3, 'JavaScript'],
    ['correct', 3],
    [true, 'Correct'],
    [false, 'Try again!']
]);

console.log(question);

// Convertir objetos a mapas
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Quiz App
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

const answer = 3;
console.log(answer);
console.log(question.get(question.get('correct') === answer));

// Convertir mapa en arreglo
console.log([...question]);
console.log(question.entries());
console.log(question.keys());
console.log(question.values());

///////////////////////////////////////
// Coding Challenge #3

/*
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1.
const events = [...new Set(gameEvents.values())];
console.log(events)

// 2.
gameEvents.delete(64);

// 3.
const time1 = [...gameEvents.keys()].pop();
console.log(`An event happened, on average, every ${time1 / gameEvents.size} minutes`);

// 4.
for (const [min, event] of gameEvents) {
  const half = min <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half}] ${min}: ${event}`);
}
