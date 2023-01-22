'use strict';

// SE utiliza para seleccionar un elemento del dom mediante los selectores de css
document.querySelector('.message');

// El textContent nos muestra el texto que contiene el elemento que seleccionamos
console.log(document.querySelector('.message').textContent);

/////////////////////////////////////////////
// Que es el DOM y Manipulacion del DOM


// El Document Object Model (DOM): Es una representacion estructurada de documentos HTML.
// Permite a JavaScript acceder a elementos HTML y estilos para manipularlos.

// Settear la propiedad de texto

document.querySelector('.message').textContent = 'Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

// Si es un input debemos utilizar value para obtener el valor actual que tiene

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);