"use strict";

////////////////////////////////////////////////
// Funciones constructoras y el operador new

// Ejemplo de funcion constructora
const Person = function (firstName, birthYear) {
  // Propiedades de la instancia
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create a method inside constructor function
  // this.calcAge = function () {
  // 	console.log(2037 - this.birthYear);
  // };
  console.log(this);
};

const jonas = new Person("Jonas", 1991);
console.log(jonas.firstName);

// 1. New {} (Empty Object) is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically returns {}

const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1975);

console.log(matilda, jack);

const jay = "Jay";

console.log(jonas instanceof Person);
console.log(jay instanceof Person);

////////////////////////////////////////////
// Prototipos (Prototypes)
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();
jack.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));

Person.prototype.species = "Homo Sapiens";
console.log(jonas, matilda);
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty("firstName"));
console.log(jonas.hasOwnProperty("species"));
console.log(jonas.hasOwnProperty("name"));

////////////////////////////////////////////////////
// Herencia prototipica en objetos integrados

// Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 6, 4, 7, 4, 3]; // new Array []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector("h1");
console.dir(h1);
console.dir((x) => x + 1);

///////////////////////////////////////
// Coding Challenge #1

/*
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();
bmw.accelerate();

/////////////////////////////////////////////////
// ES6 Clases

// class expression
// const PersonClE = class {};

// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    // Propiedades
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Metodos de instancia
  // Métodos se agregarán a la propiedad .prototype
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    console.log(name)
    if (name.includes(' '))  this._fullName = name
    else alert(`${name} is not a full name!`)
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there');
    console.log(this);
  }
}

const jessica = new PersonCl("Jessica Davis", 1996);
console.log(jessica);
console.log(jessica.fullName);
jessica.calcAge();
console.log(jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

jessica.greet();

// 1. Classes are not hoisted (No podemos usarlas antes de declararlas en el codigo
// 2. Classes are first-class citizens (Podemos pasarlos a funciones y tambien devolverlos de funciones)
// 3. Classes are executed in strict mode

///////////////////////////////////////////////////////////
// Setters y getters

const walter = new PersonCl('Walter White', 1965)
PersonCl.hey();

const account = {
  owner: "Jonas",
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },

};

console.log(account.latest);

account.latest = 50;
console.log(account.movements);

////////////////////////////////////////////////////////////
// Métodos Estáticos

// Los metodos estáticos estan definidos en el constructor por lo que no estan disponibles en el prototipo y sus
// herencias

const Person1 = function (firstName, birthYear) {
  // Propiedades de la instancia
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create a method inside constructor function
  // this.calcAge = function () {
  // 	console.log(2037 - this.birthYear);
  // };
  console.log(this);
};

// No hay forma de que este método sea heredado, simplemente esta en el constructor
Person1.hey = function () {
  console.log('Hey there');
};

Person1.hey();