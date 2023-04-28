// import icons from '../img/icons.svg'; // Parcel 1
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

// programacion es necesario esribir url antes de la dirección del archivo
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
    try {
        const id = window.location.hash.slice(1);
        // console.log(id);
        if (!id) return;
        recipeView.renderSpinner();

        // 1. Loading recipe
        await model.loadRecipe(id);

        // 2. Rendering recipe
        recipeView.render(model.state.recipe);
    } catch (err) {
        console.error(err);
        recipeView.renderError();
    }
};

const controlSearchResults = async function() {
    try {
        // 1) Get search query
        const query = searchView.getQuery();
        if (!query) return;

        // 2) Load search results
        await model.loadSearchResults(query);

        // 3) Render results
        console.log(model.state.search.results);
    } catch (err) {
        console.log(err);
    }
}

const init = function () {
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults)
};
init();

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
