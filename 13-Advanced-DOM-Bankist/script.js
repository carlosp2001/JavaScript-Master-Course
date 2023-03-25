'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

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

// Boton de scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth' // Esta propiedad le da el efecto al scrolling
  // });

  // Manera mas moderna de hacer scrolling, solo funciona en navaegadores modernos
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////////////////////
// Navegacion de página

// Forma de hacerlo sin delegación de eventos
// document.querySelectorAll('.nav__link').forEach(el =>
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//     // console.log(id);
//   })
// );

// Usando la delegación de eventos: esta tecnica nos ayuda a saber de donde vino el elemento click y hace mas eficiente
// nuestro codigo ya que a diferencia no tenemos que repetir el event handler a todos los elementos
// 1. Agregar un event listener a un elemento padre comun
// 2. Determinar que elemento originó el evento

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  e.preventDefault();

  // Estrategia de comparación
  if (e.target.classList.contains('nav__link')) {
    console.log('LINK');
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    // console.log(id);
  }
});

// Componente con pestañas

// Usando delegacion de eventos
tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  // Guard clause
  if (!clicked) return;

  // Pestaña activa
  // Remover clases activas
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activar pestaña
  clicked.classList.add('operations__tab--active');

  // Activar area de contenido
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
}
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

/*
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
*/

/*
// Implementando desplazamiento suave / smooth scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);
  console.log(
      'height/width viewport',
      document.documentElement.clientHeight,
      document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth' // Esta propiedad le da el efecto al scrolling
  // });

  // Manera mas moderna de hacer scrolling, solo funciona en navaegadores modernos
  section1.scrollIntoView({ behavior: 'smooth' });
});
*/

/*
////////////////////////////////////////////////////////////
// Tipos de eventos y manejo de eventos (event handlers)

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert("addEventlistener: Great you're greating the header :D");

  // Con el metodo removeEventListener eliminamos el llamado y la siguiente vez ya no sucede
  // h1.removeEventListener('mouseenter', alertH1);
}

h1.addEventListener('mouseenter', alertH1);

// Eliminar un event listener con un timeOut
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// h1.onmouseenter = function (e) {
//   alert("addEventlistener: Great you're greating the header :D");
// }
 */

/*
////////////////////////////////////////////////////////
// Propagación de evento: Bubbling y Captura

///////////////////////////////////////////////////////
// Propagación de eventos en práctica

// rgb(255, 255, 255) color aleatorio
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

// Al ver el objetivo donde se origina el evento los tres elementos tienen el mismo punto de origen
// currentTarget hace referencia al elemento en donde se adjunta el controlador de eventos, por lo tanto currentTarget
// y this son lo mismo
document.querySelector('.nav__link').addEventListener('click', function (e) {
  // Recordar que la función flecha no tiene elemento this
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // stopPropagation: Esto nos ayuda a que simplemente se ejecute ese eventHandler y no se propague en los demas
  // elementos
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
}, true); // Si colocamos el parametro true activamos que escuche la fase de captura, es decir que ahora este
// será el primer método realizado
*/

/////////////////////////////////////////////////////////////////
// Delegacion de Evento: Implementando navegacion de la pagina

/*
/////////////////////////////////////////////////////////////////
// Atravesar el DOM (DOM Traversing)

const h1 = document.querySelector('h1');

// Going downwards (bajando): child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes); // Nos devuelve la lista de nodos contenidos
console.log(h1.children); // Nos devuelve una coleccion HTML
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards (subiendo): padres
console.log(h1.parentNode); // Nos devuelve los elementos padres
console.log(h1.parentElement);
h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling );

console.log(h1.parentElement.children); // Metodo para recuperar todos los elementos hermanos
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
})
 */

////////////////////////////////////////////////////////
// Construyendo un componente con pestañas
