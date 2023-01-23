'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModals = document.querySelectorAll('.show-modal');
console.log(btnOpenModals);

for (let i = 0; i < btnOpenModals.length; i++) {
	console.log(btnOpenModals[i].textContent);
}