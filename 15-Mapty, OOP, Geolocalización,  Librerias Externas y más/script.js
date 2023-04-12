'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
	#map;
	#mapEvent;

	constructor() {
		this._getPosition();
		form.addEventListener('submit', this._newWorkout.bind(this));
		inputType.addEventListener('change', this._toggleElevationField);
	}

	_getPosition() {
		navigator.geolocation.getCurrentPosition(
			this._loadMap.bind(this), function () {
				alert('Could not get the position');
			}
		);
	}

	_loadMap(position) {
		const {latitude} = position.coords;
		const {longitude} = position.coords;
		console.log(latitude, longitude);

		const coords = [latitude, longitude];
		this.#map = L.map('map').setView(coords, 13); // El segundo parametro hace referencia a la cantidad de zoom
		// del mapa
		console.log(this.#map);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution:
				'&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors',
		}).addTo(this.#map);

		// Handling clicks on map
		this.#map.on('click', this._showForm.bind(this));
	}

	_showForm(mapE) {
		this.#mapEvent = mapE
		form.classList.remove('hidden')
		inputDistance.focus();

		console.log(this.#mapEvent);
	}

	_toggleElevationField() {
		inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
		inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
	}

	_newWorkout(e) {
		e.preventDefault();

		// Clear input fields
		inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

		// Mostrar marcador
		console.log(this.#mapEvent);
		const {lat, lng} = this.#mapEvent.latlng;
		L.marker([lat, lng]).addTo(this.#map).bindPopup(L.popup({
			maxWidth: 250,
			minWidth: 100,
			autoClose: false,
			closeOnClick: false,
			className: 'running-popup'
		})).setPopupContent('Workout').openPopup();
	}
}

/////////////////////////////////////////////////////////
// Geolocalización API

const app = new App();

//////////////////////////////////////////////////////////
// Mostrando un map usando libreria Leaflet

/////////////////////////////////////////////////////////
// Mostrando un marcador en el mapa

/////////////////////////////////////////////////////////
// Renderizando Formulario input del entrenamiento

/////////////////////////////////////////////////////////
// Refactorizando para el proyecto de arquitectura
