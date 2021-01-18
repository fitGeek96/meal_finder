//jshint esversion:9
const searchBtnEl = document.getElementById('search');
const submitBtnEl = document.getElementById('submit');
const randomBtnEl = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeadingEl = document.getElementById('result__heading');
const singleMealEl = document.getElementById('single__meal');


function searchMeal(e) {
    e.preventDefault();
    // Clear single Meal
    singleMealEl.innerHTML = '';
    // Get search Term
    const term = searchBtnEl.value;
    // Check for empty input 
    if (term.trim()) {
        
    } else {
        alert('Pealse enter a term ...');
    }
    // searchBtnEl.value = '';
}



// EVENT LISTENERS
submitBtnEl.addEventListener('click', searchMeal);