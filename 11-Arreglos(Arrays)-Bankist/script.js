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

const displayMovements = (movements, sort = false) => {
  // InnerHTML nos permite sobreescribir el codigo HTML y tambien nos devuelve el html completo del elemento que
  // seleccionamos
  containerMovements.innerHTML = "";
  // .textContent = 0

  // Aqui realizamos una copia del arreglo movimientos para no mutar el arreglo original
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = (acc) => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = (acc) => {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = (accs) => {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUsernames(accounts); // stw
// console.log(accounts);

const updateUI = (acc) => {
  // Mostrar movimientos
  displayMovements(acc.movements);

  // Mostrar balance
  calcDisplayBalance(acc);

  // Mostrar resumen
  calcDisplaySummary(acc);
};

// Event handler
let currentAccount;

btnLogin.addEventListener("click", (e) => {
  // Esto evitará que la página ser recargue al ser un button al que le daremos click
  // Prevenimos la sumisión del form
  e.preventDefault();
  console.log("LOGIN");
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  // Optional Chaining / Encadenamiento opcional
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Mostrar UI y mensaje
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;
    // Limpiar campos de entrada
    inputLoginUsername.value = inputLoginPin.value = "";
    // inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", (e) => {
  // Con esto evitamos que se recargue la página
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = account.find(
    (acc) => acc.username === inputTransferTo.value
  );
  // console.log(amount, receiverAccount);
  inputTransferAmount.value = inputTransferTo.value = "";
  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    // Haciendo la transferencia
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    // console.log("Transfer valid");

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  // Verificamos si existe un depósito que tenga el valor del 10% solicitado del préstamo
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Agregar el movimiento
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
    inputLoanAmount.value = "";
  }
});

///////////////////////////////////////////
// El método findIndex

btnClose.addEventListener("click", (e) => {
  e.preventDefault();

  console.log("Delete");

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);

    // Eliminar cuenta
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

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
const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
console.log(currenciesUnique);

currenciesUnique.forEach((value, _, map) => {
  console.log(`${value}: ${value}`);
});

///////////////////////////////////////
// Coding Challenge #1

/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const checkDogs = (dogsJulia, dogsKate) => {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // dogsJulia.slice(1, 3);
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);
  //("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
  dogs.forEach((dog, i) => {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

///////////////////////////////////////////////////
// Transformación de datos: Map, filter, reduce

//////////////////////////////////////////////////
// Método Map

const eurToUsd = 1.1;

// const movementsUSD = movements.map((mov) => {
//   return mov * eurToUsd;
// });

// Usando función flecha
const movementsUSD = movements.map((mov) => mov * eurToUsd);
console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i, arr) =>
    `Movement ${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(
      mov
    )}`
  // if (mov > 0) {
  //   return `Movement ${i + 1} You deposited ${mov}`;
  // } else {
  //   return `Movement ${i + 1} You withdrew ${Math.abs(mov)}`;
  // }
);

console.log(movementsDescriptions);

//////////////////////////////////////////
// Metodo Filter

const deposits = movements.filter((mov, i, arr) => mov > 0);
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter((mov) => mov < 0);
console.log(withdrawals);

//////////////////////////////////////////
// Metodo Reduce

// acumulador -> Bola de nieve, se agregan todos los elementos del arreglo
// const balance = movements.reduce((acc, curr, i, arr) => {
//   return acc + curr;
// }, 0);

const balance = movements.reduce((acc, curr) => acc + curr, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);

console.log(max);

///////////////////////////////////////
// Coding Challenge #2

/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge = (ages) => {
  const humanAges = ages.map((age) => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanAges);
  const adults = humanAges.filter((age) => age >= 18);
  console.log(humanAges);
  console.log(adults);

  // return adults.reduce((acc, age) => acc + age, 0) / adults.length;

  // Podemos hacerlos de la siguiente manera
  // 2 3. (2+3)/2 = 2.5 === 2/2 + 3/2 = 2.5
  return adults.reduce((acc, age, i, arr) => acc + age / arr.length, 0);
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

/////////////////////////////////////////////
// La magia de metodos en cadena

// PIPELINE
const totalDepositsUSD = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);

///////////////////////////////////////
// Coding Challenge #3

/*
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcAverageHumanAge = (ages) => {
//   const humanAges = ages.map((age) => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter((age) => age >= 18);
//   return adults.reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// };

const calcAverageHumanAgeArrow = (ages) =>
  ages
    .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter((age) => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avgA1 = calcAverageHumanAgeArrow([5, 2, 4, 1, 15, 8, 3]);
const avgA2 = calcAverageHumanAgeArrow([16, 6, 10, 5, 6, 1, 4]);
console.log(avgA1, avgA2);

/////////////////////////////////////////////
// El método find

const firstWithdrawal = movements.find((mov) => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);
const account = accounts.find((acc) => acc.owner === "Jessica Davis");
console.log(account);

////////////////////////////////////////////////
// Métodos some y every
// IGUALDAD
console.log(movements);
console.log(movements.includes(-130));

// SOME: CONDICIÓN
// En este caso equivaldria igual al includes
console.log(movements.some((mov) => mov === -130));

// El método some nos devuelve true si existe un valor igual en la matriz
// Saber si ha habido depósitos en esa cuenta
const anyDeposits = movements.some((mov) => mov > 0);
console.log(anyDeposits);

// EVERY
// Nos devuelve true si todos los elementos de la matriz cumplen la condición
console.log(movements.every((mov) => mov > 0));
console.log(account4.movements.every((mov) => mov > 0));

// Callback separado
const deposit = (mov) => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

const arr3 = [[1, 2, 3], [4, 5, 6], 7, 8];

// Elimina los arreglos anidados y crea un solo array
console.log(arr3.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// Se puede utilizar el argumento de profundidad, este nos ayuda a determinar hasta que nivel queremos que nuestro
// método flat llegue
console.log(arrDeep.flat(2));

// Sacar todos los movimientos de todas las cuentas de un banco
const accountMovements = accounts.map((acc) => acc.movements);
console.log(accountMovements);

const allMovements = accountMovements.flat();
console.log(allMovements);

// flat
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
const overallBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// flatMap
// flatMap solo puede ir a un nivel de profundidad, si necesitamos profundizar más necesitamos usar flat
const overallBalanceF = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalanceF);

///////////////////////////////////////////////////
// Ordenar Arreglos / Sorting Arrays

// Strings / Ordenar alfabéticamente
const owners = ["Jonas", "Zach", "Adam", "Martha"];
console.log(owners.sort());

// Numeros
console.log(movements);
// console.log(movements.sort()); // De esta forma no los ordena por valor sino que toma en consideración el primer
// número y lo convierte a cadena

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)
// Ordenar ascendente
// movements.sort((a, b) => {
//   // console.log(a, b);
//   if (a > b) return 1;
//   if (b > a) return -1;
// });

movements.sort((a, b) => a - b);
console.log(movements);

// Ordenar descendente
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });

movements.sort((a, b) => b - a);

console.log(movements);

///////////////////////////////////////////////////////////
// Más formas de rellenar y crear arreglos

console.log([1, 2, 3, 4, 5, 6]);
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Este método con su primer parámetro nos ayuda a determinar el largo de ese array para después llenarlo con el
// método fill
// Empry arrays + el metodo fill
const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5));

// El primer parámetro de fill hace referencia al valor que tendrá, el segundo es el indice donde comienza y el tercer
// parámetro determina donde finaliza el índice
x.fill(1, 3, 5);
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

// Array.from
const y = Array.from(
  {
    length: 7,
  },
  () => 1
);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1); // Nos devuelve desde el índice 0 hasta 6
console.log(z);

labelBalance.addEventListener("click", () => {
  // Tomamos los elementos del dom y los convertimos a un array
  const movementsUI = Array.from(
    document.querySelectorAll(".movements__value"),
    (el) => Number(el.textContent.replace("€", ""))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll(".movements__value")];
});

/////////////////////////////////////////////////////
// Práctica de métodos de un array

// 1. Sumar todos los depositos de todas las cuentas utilizando el método flatMap
const bankDepositSum = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);

// 2. Contar cuantos depósitos han habido en el banco con al menos $1,000
// Usando length
// const numDeposits1000 = accounts
//   .flatMap((acc) => acc.movements)
//   .filter((mov) => mov >= 1000).length;

// Usando reduce
const numDeposits1000 = accounts
  .flatMap((acc) => acc.movements)
  // .reduce((count, cur) => cur >= 1000 ? count + 1 : count, 0);
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
console.log(numDeposits1000);

// Al usar el operador a++, el nos devolvera el valor anterior, hasta despues de la declaración obtendra el valor sumado

let a = 10;
console.log(a++);
console.log(a);

// La solución facil para esto es el prefijo plus plus
console.log(++a);

// 3. Crear un nuevo objeto en lugar de solo un numero o solo una cadena.
const { depositsR, withdrawalsR } = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.depositsR += cur) : (sums.withdrawalsR += cur);
      sums[cur > 0 ? "depositsR" : "withdrawalsR"] += cur;
      return sums;
    },
    { depositsR: 0, withdrawalsR: 0 }
  );

console.log(depositsR, withdrawalsR);

// 4. Crear una simple función para convertir cualquier cadena en un caso de título
// Ejemplo this is a nice -> This Is a Nice Title
const convertTitleCase = (title) => {
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
  const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];

  return capitalize(
    title
      .toLowerCase()
      .split(" ")
      .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
      .join(" ")
  );
};
console.log(convertTitleCase("this is a nice title"));
console.log(convertTitleCase("this is a LONG title but not too long"));
console.log(convertTitleCase("and here is another title with an EXAMPLE"));

//////////////////////////////////////////
// Coding Challenge #4

/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

// 1.
dogs.forEach((dog) => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
// console.log(dogs);

// 2.
const dogSarah = dogs.find((dog) => dog.owners.includes("Sarah"));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating ${
    dogSarah.curFood > dogSarah.recFood ? "much" : "little"
  }`
);

// 3.
const ownersEatTooMuch = dogs
  .filter((dog) => dog.curFood > dog.recFood)
  .flatMap((dog) => dog.owners);
// .flat();
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter((dog) => dog.curFood < dog.recFood)
  .flatMap((dog) => dog.owners);
// .flat();
console.log(ownersEatTooLittle);

// 4.
// "Matilda and Alice and Bob's dogs eat too much!" and
// "Sarah and John and Michael's dogs eat too little!"

console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat too little!`);

// 5.
console.log(dogs.some((dog) => dog.curFood === dog.recFood));

// 6.
// current > (recommended * 0.90) && current < (recommended * 1.10)
const checkEatingOkay = (dog) =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood > dog.recFood * 1.1;
console.log(dogs.some(checkEatingOkay));

// 7.
console.log(dogs.filter(checkEatingOkay));

// 8.
// sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's
// objects)
const dogsSorted = dogs.slice().sort((a, b) => a.recFood = b.recFood);
console.log(dogsSorted);
