'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModals = document.querySelectorAll('.show-modal');
// console.log(btnOpenModals);

const openModal = () => {
	console.log('Button clicked');
	// Removemos la clase hidden para que el modal sea visible
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
}

const closeModal = () => {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
}

for (let i = 0; i < btnOpenModals.length; i++) {
	btnOpenModals[i].addEventListener('click', openModal);
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal)

// Evento al presionar la tecla esc
// keydown es cuando nosotros presionamos la tecla
// keyup es cuando nosotros dejamos de presionar
// keypress es cuando la mantenemos presionada
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
})