"use strict";

//////////////////////////////////////////////////////
// Parametros predeterminados / Default Parameters

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5 forma antigua
  // numPassengers = numPassengers || 1;
  // price = price || 199;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", 5);

// Saltarse un parametro
createBooking("LH123", undefined, 1000);

/////////////////////////////////////////////////////////////////////
// Como el pasar argumentos funciona Valor vs Referencia

const flight = "LH234";
const jonas = {
  name: "Jonas Schmedtmann",
  passport: 243738219,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "LH999";
  passenger.name = "Mr. " + passenger.name;

  if (passenger.passport === 243738219) {
    alert("Check in");
  } else {
    alert("Wrong password");
  }
};

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

// Es lo mismo que hacer...
const flightNum = flight;
const passenger = jonas;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(jonas);
checkIn(flight, jonas);

//////////////////////////////////////////////////////////////
// Funciones de primera clase / Funciones de orden superior

/*
Que son las funciones de primera clase? JavaScript llama a las funciones como primeros ciudadanos, esto significa que
las funciones son simples valores, funciones son solo otro tipo de objeto

Que es una función de orden superior? Es una funcion que recibe otra funcion como argumento, que retorna una nueva
función o ambas.
 */

/////////////////////////////////////////////////////////////
// Funciones aceptando llamados de funciones

const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

// High Order Function / Funcion de orden superior
const transformer = function (str, fn) {
  console.log(`Original String: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transformer("JavaScript is the best", upperFirstWord);
transformer("JavaScript is the best", oneWord);

// JS usa callbacks todo el tiempo
const high5 = function () {
  console.log("Hi!");
};

document.body.addEventListener("click", high5);

["Jonas", "Marta", "Adam"].forEach(high5);

///////////////////////////////////////////////////////////////////
// Funciones retornando funciones / functions returning functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet("Hey");
greeterHey("Jonas");
greeterHey("Steven");

greet("Hello")("Jonas");

// Challenge: Reescribir la función en arrow function
const greetArr = (greeting) => (name) => console.log(`${greeting} ${name}`);
greetArr("Hi")("Jonas");

/////////////////////////////////////////////
// Metodos call y apply

const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  // book: function () {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, "Carlos Pineda");
lufthansa.book(635, "John Smith");
console.log(lufthansa)

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

const book = lufthansa.book;

// No funciona porque estamos haciendo una llamado a la funcion normal, la palabra this en este contexto toma el valor
// de undefined
// book(23, "Sarah Williams");

// Metodo call
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: []
}

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

// Metodo apply
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);