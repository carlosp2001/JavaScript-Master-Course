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
    console.log(name);
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log("Hey there");
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

const walter = new PersonCl("Walter White", 1965);
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
  console.log("Hey there");
};

Person1.hey();

////////////////////////////////////////////////////////
// Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = "Steven";
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1979);
sarah.calcAge();

///////////////////////////////////////
// Coding Challenge #2

/*
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl("Ford", 120);
console.log(ford.speedUS);
ford.accelerate();
ford.accelerate();
ford.brake();
ford.speedUS = 50;
console.log(ford);

///////////////////////////////////////////////////////
// Herencia entre clases: funciones constructoras

const PersonH = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

PersonH.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  PersonH.call(this, firstName, birthYear);
  this.course = course;
};

// Vinculando prototipos
Student.prototype = Object.create(PersonH.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student("Mike", 2020, "Computer Science");
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor); // De esta forma JS piensa que el constructor de student es Person
// esto es porque establecemos la propiedad del prototipo del estudiante usando el object.create

///////////////////////////////////////
// Coding Challenge #3

/*
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const CarC = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

CarC.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

CarC.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
  CarC.call(this, make, speed);
  this.charge = charge;
};

// Link the prototypes
EV.prototype = Object.create(CarC.prototype);
EV.prototype.chargeBattey = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}`
  );
};

const tesla = new EV("Tesla", 120, 23);
tesla.chargeBattey(90);
console.log(tesla);
tesla.brake();
tesla.accelerate();
console.log(tesla);

///////////////////////////////////////////////////////
// Herencia entre clases: Clases ES6

class PersonC {
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
    console.log(name);
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log("Hey there");
    console.log(this);
  }
}

// Si no necesitas agregar una nueva propiedad en la clase hijo no es necesario crear un nuevo constructor simplemente
// se utiliza la palabra extends
class StudentC extends PersonC {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear); // Es la función constructora de la clase padre, necesita pasar siempre primero
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  // Sobreescribir metodo
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      } `
    );
  }
}

const martha = new StudentC("Martha Jones", 2012, "Computer Science");
martha.introduce();
martha.calcAge();

///////////////////////////////////////////////////////
// Herencia entre clases: Object.create

const PersonProto1 = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const stevenC = Object.create(PersonProto1);

const StudentProto1 = Object.create(PersonProto1);
StudentProto1.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto1.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay1 = Object.create(StudentProto1);
jay1.init("Jay", 2010, "Computer Science");
jay1.introduce();
jay1.calcAge();

////////////////////////////////////////////////////////////
// Otro ejemplo de clase

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currrency = currency;
    // protected property
    this._pin = pin;
    this._movements = [];
    this.locale = navigator.language;
    console.log(`Thanks for openning an account, ${owner}`);
  }

  // Public interface of our objects
  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
  }
}

const acc1 = new Account("Jonas", "EUR", 1111, []);

acc1._movements.push(250);
acc1._movements.push(-140);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
acc1._approveLoan(1000);
console.log(acc1.getMovements());

console.log(acc1);
console.log(acc1._pin);

///////////////////////////////////////////////////////////
// Encapsulación: Propiedades protegidas y métodos

///////////////////////////////////////////////////////////
// Encapsulación: Campos de clases privadas y métodos

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// Podemos pensar en un campo como una propiedad que estará en todas las instancias, por eso también podemos llamar a
// esto un campo de instancia pública.
// (there is also the static version)

class AccountE {
  // 1) Public field (campos estan en las intancias)
  locale = navigator.language;

  // 2) Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currrency = currency;
    // protected property
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;
    console.log(`Thanks for openning an account, ${owner}`);
  }

  // 3) Public methods

  // Public interface of our objects
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }

  static helper() {
    console.log("Helper");
  }

  // 4) Private methods
  // #approveLoan(val) {
  //   return true;
  // }
}

const acc2 = new AccountE("Jonas", "EUR", 1111, []);

acc2.deposit(250);
acc2.withdraw(140);
acc2.requestLoan(1000);
acc2._approveLoan(1000);
console.log(acc2);
// console.log(acc2.#movements);
console.log(acc2.getMovements());
// console.log(acc2.#pin)

AccountE.helper();

//////////////////////////////////////////////////////////////
// Chaining Methods

acc2.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc2.getMovements());

///////////////////////////////////////
// Coding Challenge #4

/*
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarClE {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarClE {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattey(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCl("Rivian", 120, 23);
console.log(rivian);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattey(50)
  .accelerate();

console.log(rivian.speedUS);
