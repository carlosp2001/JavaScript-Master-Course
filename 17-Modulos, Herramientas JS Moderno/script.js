/////////////////////////////////////////////////////////
// Exportando e importando módulos en ES6

// Módulo de importación
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// console.log('Importing module');
// addToCart('bread', 5)
// console.log(price, tq);
// // console.log(shippingCost);

// console.log('Importing Module')
// import * as ShoppingCart from './shoppingCart.js'
//
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

import add, {
    addToCart,
    totalPrice as price,
    tq,
    cart,
} from './shoppingCart.js';
add('pizza', 6);
add('bread', 5);
add('apples', 4);

console.log(price);
console.log(cart); // En este caso se demuestra la conexion que tenemos con el
// modulo de exportación

///////////////////////////////////////////////////////////////////////
// Usando await en codigo de alto nivel

// De esta forma ya no se necesita el uso de una funcion async
/*
console.log('Start fetching');
const res = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await res.json();
console.log(data);
console.log('Something');
 */

const getLastPost = async function () {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    console.log(data);
    return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost);

//Not very clean
lastPost.then(last => console.log(last));

/*
const lastPost2 = await getLastPost();
console.log(lastPost2);
 */

//////////////////////////////////////////////////////////
// Patrón de modulo

const ShoppingCart2 = (function () {
    const cart = [];
    const shippingCost = 10;
    const totalPrice = 237;
    const totalQuantity = 23;

    const addToCart = function (product, quantity) {
        cart.push({ product, quantity });
        console.log(
            `${quantity} ${product} added to cart shipping cost is ${shippingCost}`
        );
    };

    const orderStock = function (product, quantity) {
        console.log(`${quantity} ${product} ordered from supplier`);
    };

    return {
        addToCart,
        cart,
        totalPrice,
        totalQuantity,
    };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost);

//////////////////////////////////////////////////////////////
// Módulos CommonJS

// // Export
// export.addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(
//         `${quantity} ${product} added to cart shipping cost is ${shippingCost}`
//     );
// }
//
// // Import
// const { addToCart } = require('./shoppingCart.js');

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

const state = {
    cart: [
        { product: 'bread', quantity: 5 },
        { product: 'pizza', quantity: 5 },
    ],
    user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
state.user.loggedIn = false;
console.log(stateClone);

// Clonar varios niveles con lodash

const stateDeepClone = cloneDeep(state);
state.user.loggedIn = true;
console.log(stateDeepClone);
console.log(state);

// Esto nos ayuda a lograr que nuestra pagina no se reinicie cada vez que
// cambiamos los datos, esto nos ayuda a que se inyecte automáticamente el
// codigo

if (module.hot) {
    module.hot.accept();
}

class Person {
    #greeting = 'Hey';
    constructor(name) {
        this.name = name;
        console.log(`${this.#greeting}, ${this.name}`);
    }
}

const jonas = new Person('Jonas');
console.log('Jonas' ?? null);
// Caracteristicas como find y promise no se pueden transpilar a ES5 porque
// son caracteristicas especificas de ES6, a diferencia de otras caracteristicas
// que solo fueron cambiadas sus sintaxis
console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST').then(x => console.log(x));

import 'core-js/stable';

// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// Polifilling async functions
import 'regenerator-runtime/runtime';