// Modulo de exportación

console.log('Exporting module ');

// Blocking code: Este segmento hace que el codigo a donde se importara bloquee
// su ejecución hasta que finalice el fetch
/*console.log('Start fetching users');
await fetch('https://jsonplaceholder.typicode.com/users');
console.log('Finish fetching users');
*/

const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

// De esta forma podemos importar un valor predeterminado, al momento de
// exportarlo podemos darle cualquier nombre
export default function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
}
