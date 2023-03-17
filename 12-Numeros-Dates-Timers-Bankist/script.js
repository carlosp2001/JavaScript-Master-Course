"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2023-03-01T23:36:17.929Z",
    "2023-03-15T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

// Funcion que convierte las diferencias de fechas en dias
const formatMovementDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  // const day = `${date.getDate()}`.padStart(2, "0");
  // const month = `${date.getMonth() + 1}`.padStart(2, "0");
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;

  return new Intl.DateTimeFormat(locale).format(date);

  // const days1 = calcDaysPassedF(new Date(2037, 3, 14), new Date(2037, 3, 24));
};
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
         <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// FAKE ALWAYS LOGGED IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

// const nowA = new Date();
// const day = `${nowA.getDate()}`.padStart(2, "0");
// const month = `${nowA.getMonth() + 1}`.padStart(2, "0");
// const year = nowA.getFullYear();
// const hour = nowA.getHours();
// const min = nowA.getMinutes();
// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

// day / month / year

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and  time

    // const locale = navigator.language;
    // console.log(locale);
    const nowTest = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      // month: '2-digit',
      year: "numeric",
      weekday: "long",
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(nowTest);

    // const nowA = new Date();
    // const day = `${nowA.getDate()}`.padStart(2, "0");
    // const month = `${nowA.getMonth() + 1}`.padStart(2, "0");
    // const year = nowA.getFullYear();
    // const hour = `${nowA.getHours()}`.padStart(2, "0");
    // const min = `${nowA.getMinutes()}`.padStart(2, "0");
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

////////////////////////////////////////////////
// Convirtiendo y verificando números

// Los numeros en JS siempre son representados como decimales
console.log(23 === 23.0);

// Base 10 - 0 to 9
// Binary base 2 - 0 1
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

// Convirtiendo Strings a Numeros
console.log(Number("23"));
// Al aparecer el operando de suma se realiza la coerción de tipos
console.log(+"23");

// Parsing
console.log(Number.parseInt("30px", 10)); // Solo funciona si comienza con un numero
console.log(Number.parseInt("1010px", 2)); // Base binaria
console.log(Number.parseInt("e23", 10));

console.log(Number.parseInt(" 2.5rem")); // Pueden haber espacios que no afectan en el resultado
console.log(Number.parseFloat("2.5rem"));
// Estas también son llamadas funciones globales, es decir que podemos llamarles sin necesidad de utilizar el objeto
console.log(parseFloat("2.5rem"));

// Verificar si el valor es NaN
console.log(Number.isNaN(20));
console.log(Number.isNaN("20"));
console.log(Number.isNaN(+"20X"));
console.log(Number.isNaN(+"20X"));
console.log(Number.isNaN(23 / 0));

// Mejor manera de verificar si un valor es un numero
console.log(Number.isFinite(20));
console.log(Number.isFinite(+"20"));
console.log(Number.isFinite("20"));
console.log(Number.isFinite(+"20X"));
console.log(Number.isFinite(23 / 0));

console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));

/////////////////////////////////////////////////
// Math y redondeo

// Raíz cuadrada
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2)); // Encontrar raíz cuadrada utilizando el operador de exponente
console.log(8 ** (1 / 3)); // Raíz cúbica

// Encontrar el valor max
console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, "23", 11, 2)); // Realiza coerción de tipo
console.log(Math.max(5, 18, "23px", 11, 2));

// Encontrar el valor min
console.log(Math.min(5, 18, 23, 11, 2));

// Uso del PI
console.log(Math.PI * Number.parseFloat("10px") ** 2);

// Generar números aleatorios
console.log(Math.trunc(Math.random() * 6) + 1);
// Número aleatorio que se mantendrá entre un rango
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
// 0...1 -> 0...(max-min) -> min...max
console.log(randomInt(10, 20));

// Redondeo de enteros
console.log(Math.trunc(23.3)); // Elimina, no redondea cualquier parte decimal

console.log(Math.round(23.3));
console.log(Math.round(23.9));

console.log(Math.ceil(23.6)); // Siempre redondearán al numero mayor
console.log(Math.ceil(23.9));

console.log(Math.floor(23.3)); // Redondea al numero menor
console.log(Math.floor("23.9")); // Redondea al numero menor

// Diferencia entre trunc y floor
console.log(Math.trunc(-23.3)); // Este simplemente elimina la parte decimal -23
console.log(Math.floor(-23.3)); // Este redondea al numero menor seria -24

// Redondeo de decimales
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log(+(2.345).toFixed(2));

////////////////////////////////////////////
// El operador restante

console.log(5 % 2);
console.log(5 / 2); // 5 = 2 * 2 + 1

console.log(8 % 3);
console.log(8 / 3); // 8 = 2 * 3 + 2

// Even numbers : Números pares / Odd Numbers : Números impares
console.log(6 % 2); // Even number
console.log(6 / 2);

console.log(7 % 2);
console.log(7 / 2);

const isEven = (n) => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

labelBalance.addEventListener("click", () => {
  [...document.querySelectorAll(".movements__row")].forEach((row, i) => {
    // 0, 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = "orangered";
    // 0, 3, 6, 9
    if (i % 3 === 0) row.style.backgroundColor = "blue";
  });
});
// Nth

//////////////////////////////////////////
// Separadores numéricos

// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.14_15;
console.log(PI);

console.log(Number("230_000"));
console.log(parseInt("230_000")); // 230

//////////////////////////////////////////////
// Trabajando con BigInt

/*
BigInt es un tipo especial de números enteros que se introdujo en el año 2020
 */

// Máximo numero que JS puede representar
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(4823823184828248842399043092304n);
console.log(BigInt(4823823184828248842399043092304));

// Operaciones con BigInt
console.log(10000n + 10000n);
console.log(1234123423421342344132134234n * 10000000000n);
// console.log(Math.sqrt(16n)); // No funciona con metodos Math

const huge = 200239320204924092390420943n;
const num = 23;
console.log(huge * BigInt(num)); // No podemos hacer cálculos cuando son diferentes tipos de números

// Excepcion: Los operadores logicos si permiten comparación
console.log(20n > 15);
console.log(20n === 20); // Nos devuelve falso por la coerción de tipos
console.log(typeof 20n);
console.log(20n == 20); // Nos devuelve verdadero

console.log(huge + "is really BIG!!!");

// Divisiones
console.log(11n / 3n);
console.log(10 / 3);

///////////////////////////////////////////////
// Creando dates / fechas

// Crear una fecha
const now = new Date();
console.log(now);

console.log(new Date("Mar 12 2023 13:35:04"));
console.log(new Date("December 24, 2015"));
console.log(new Date(account1.movementsDates[0]));

// Los meses en JS tienen base 0 10 = Noviembre
console.log(new Date(2037, 10, 19, 15, 23, 5));

// JS también corrige el dia si es superior a los dias que tiene ese mes
console.log(new Date(2037, 10, 33));

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));

// Usando dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);

console.log(future.getFullYear()); // Obtener el año de una fecha
console.log(future.getMonth()); // Obtenemos el mes pero recordar que es en base 0 por lo que habría que agregarle 1
// para conocer el mes real
console.log(future.getDate());
console.log(future.getDay()); // Nos devuelve el dia lo cual hace referencia a 4 = Jueves
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime()); // Obtiene la marca de tiempo / timestamp
console.log(new Date(2142278580000)); // Revierte la marca de tiempo y la convierte en fecha

console.log(Date.now());

future.setFullYear(2040); // Cambiar el año a una fecha

////////////////////////////////////////////////////////
// Operaciones con fechas

console.log(+future); // Nos devuelve el timestamp en milisegundos

const calcDaysPassedF = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassedF(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(days1);

//////////////////////////////////////////////////////
// Internacionalizando numeros

const numIntl = 3884764;

const options = {
  // style: "unit",
  style: "currency",
  // unit: 'mile-per-hour'
  // unit: 'celsius'
  currency: "eur",
  // useGrouping: false
};

console.log("US: ", new Intl.NumberFormat("en-US", options).format(numIntl));
console.log(
  "Germany: ",
  new Intl.NumberFormat("de-DE", options).format(numIntl)
);
console.log("Syria: ", new Intl.NumberFormat("ar-SY", options).format(numIntl));
console.log(
  "Browser navigator.language: ",
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(numIntl)
);
