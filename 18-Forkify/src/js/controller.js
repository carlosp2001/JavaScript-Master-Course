// import icons from '../img/icons.svg'; // Parcel 1
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// programacion es necesario esribir url antes de la dirección del archivo
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

if (module.hot) {
    module.hot.accept();
}

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

const controlSearchResults = async function () {
    try {
        resultsView.renderSpinner();
        // 1) Get search query
        const query = searchView.getQuery();
        if (!query) return;

        // 2) Load search results
        await model.loadSearchResults(query);

        // 3) Render results
        console.log(model.state.search.results);
        // resultsView.render(model.state.search.results)
        resultsView.render(model.getSearchResultsPage());

        // 4) Render initial pagination buttons
        paginationView.render(model.state.search);
    } catch (err) {
        console.log(err);
    }
};

const controlPagination = function(goToPage) {
    // 1) Render new results
    console.log(model.state.search.results);
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultsPage(goToPage));

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);

}

const init = function () {
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination)
};
init();

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
