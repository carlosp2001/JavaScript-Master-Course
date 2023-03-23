'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////////
// Seleccionando, creando y eliminando elementos

// Seleccionando elementos //
// Aqui en realidad ya podemos aplicar estilos a todo el documento html
console.log(document.documentElement);

// Seleccionamos la cabecera del documento
console.log(document.head);

// Seleccionar el body del documento
console.log(document.head);

// Seleccionamos solamente el primer elemento
const header = document.querySelector('.header');

// Seleccionar varios elementos
// Cuando usamos querySelectorAll nos devuelve un NodeList mientras que el getElement nos devuelve una referencia
// directa del documento, es decir se mantiene actualizado del objeto
const allSections = document.querySelectorAll('.section');
console.log(allSections);

// Seleccionar mediante un elemento
document.getElementById('section--1');

const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creando e insertando elementos //
// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We used cookie for improved functionality and analytics.';
message.innerHTML =
  'We used cookie for improved functionality and analytics. <button class="btn btn--close-cookie">' +
  'Got it!</button>';

// La función prepend nos ayuda a colocar como primer child en el elemento que insertemos
// header.prepend(message);

// Se inserta de último hijo en el elemento
header.append(message); // Normalmente los elementos estan vivos en el dom es decir que solo pueden estar en una
// ubicacion al mismo tiempo

// Clonar un elemento del dom
// header.append(message.cloneNode(true))

// header.before ubica al elemento antes del elemento padre
// header.before(message);

// header.after ubica al elemento despues del elemento padre
// header.after(message);

// Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  // No es necesario seleccionar nuevamente el elemento, cuando se crea programaticamente el elemento este queda
  // guardado en memoria
  // message.remove();

  // Eliminar el elemento padre
  message.parentElement.removeChild(message);
});

/////////////////////////////////////////////////////////////////
// Estilos (Styles), Atributos (Attributes) y Clases (Classes)

// Estilos / Styles

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height); // El método style solo funciona para los estilos que están configurados in-line, si
// están definidos por una clase no funcionaran
console.log(message.style.backgroundColor);

// getComputedStyle esto nos ayuda a obtener el valor del estilo aunque este se encuentre en una clase
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

// Agregar valor a una propiedad
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// Cambiar el valor de una variable de css
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// Atributos / Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className); // Nos devulve las clases

// Definir atributos
logo.alt = 'Beautiful minimalist logo';

// Atributos no estandar
console.log(logo.designer); // Solo acepta atributos estandar
console.log(logo.getAttribute('designer'));

// Agregar atributos
logo.setAttribute('company', 'Bankist')

// Diferentes maneras de obtener un atributo
// Funciona de igual manera para los atributos href
console.log(logo.src); // Nos devuelve la ubicación absoluta
console.log(logo.getAttribute('src')); // Nos devueve la ubicacion relativa

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Atributos de datos / Data Attributes
// Este tipo de atributos comienzan con la palabra data y se almacenan en dataset
console.log(logo.dataset.versionNumber);

// Propiedades de clases / Classes properties
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // A diferencia que en un array se llama contains not includes

// No usar porque sobreescribe todas las demás clases
logo.className = 'jonas';