'use strict';

//////////////////////////////////////////////////////
// Parametros predeterminados / Default Parameters

const bookings = [];

const createBooking = function (flightNum, numPassengers = 1, price = 199 * numPassengers) {
	// ES5 forma antigua
	// numPassengers = numPassengers || 1;
	// price = price || 199;
	const booking = {
		flightNum,
		numPassengers,
		price
	}

	console.log(booking);
	bookings.push(booking);
}

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 5);

// Saltarse un parametro
createBooking('LH123', undefined, 1000);


/////////////////////////////////////////////////////////////////////
// Como el pasar argumentos funciona Valor vs Referencia

const flight = 'LH234';
const jonas = {
	name: 'Jonas Schmedtmann',
	passport: 243738219
}

const checkIn = function (flightNum, passenger) {
	flightNum = 'LH999';
	passenger.name = 'Mr. ' + passenger.name;

	if (passenger.passport === 243738219) {
		alert('Check in')
	} else {
		alert('Wrong password');
	}
}

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

// Es lo mismo que hacer...
const flightNum = flight;
const passenger = jonas;

const newPassport = function (person) {
	person.passport = Math.trunc(Math.random() * 10000000000);
}

newPassport(jonas);
checkIn(flight, jonas);
