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
console.log('Start fetching');
const res = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await res.json();
console.log(data);
console.log('Something');

const getLastPost = async function () {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    console.log(data);
    return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost);

//Not very clean
lastPost.then(last => console.log(last))

const lastPost2 = await getLastPost();
console.log(lastPost2);