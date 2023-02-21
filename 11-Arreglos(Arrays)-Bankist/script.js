"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// Métodos de arreglos simples

let arr = ["a", "b", "c", "d", "e"];
// SLICE //
// Con el metodo slice el parametro que enviamos es el indice donde comenzaremos a tomar los valores que hay en el array
console.log(arr.slice(2));
// El segundo parametro define cual sera el ultimo valor a tomar, es decir el rango de valores que tomaremos
console.log(arr.slice(2, 4));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1)); // Tomar el ultimo valor del array
console.log(arr.slice(1, -2));
console.log(arr.slice()); // Podemos realizar una copia superficial del arreglo
console.log([...arr]); // Tambien con el spread operator

// SPLICE: A diferencia del metodo slice este muta o cambia el arreglo original //
// console.log(arr.splice(2));
// ELiminar el ultimo elemento de un arreglo
arr.splice(-1);
console.log(arr);
// El segundo parametro funciona para determinar la cantidad de elementos a eliminar del arreglo comenzando por el
// primer parametro que nosotros brindamos como indice
arr.splice(1, 2);
console.log(arr);

// REVERSE //
// Altera el orden de los elementos del arreglo, este metodo muta el arreglo original
arr = ["a", "b", "c", "d", "e"];
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT //
// Este metodo no muta ningun array original
const letters = arr.concat(arr2);
console.log(letters);
// Tampoco el usar spread operator hace mutar los arra y originales
console.log([...arr, ...arr2]);

// JOIN //
console.log(letters.join(" - "));

////////////////////////////////////////////////
// El nuevo método at

const arr1 = [23, 11, 64];
console.log(arr1[0]);
console.log(arr.at(0));

// Formas de conseguir el último elemento del array
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1));
console.log(arr.at(-1));

console.log("jonas".at(-1));

//////////////////////////////////////////////
// Iterando arrays: forEach

// Una de las principales características del foreach es que en el no se pueden utilizar continue ni break
const movements1 = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const movement of movements1) {
for (const [i, movement] of movements1.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} You deposited ${Math.abs(movement)}`);
  } else {
    console.log(`Movement ${i + 1} You withdrew ${Math.abs(movement)}`);
  }
}

console.log("-------FOREACH------");
movements1.forEach((mov, i, arr) => {
  if (mov > 0) {
    console.log(`Movement ${i + 1} You deposited ${Math.abs(mov)}`);
  } else {
    console.log(`Movement ${i + 1} You withdrew ${Math.abs(mov)}`);
  }
});

// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

////////////////////////////////////////////
// forEach con Maps y Sets

// Usando maps
const currencies1 = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies1.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});

// Usando sets
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach((value,_, map) => {
  console.log(`${value}: ${value}`);
});