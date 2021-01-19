//jshint esversion:9
const searchBtnEl = document.getElementById('search');
const submitBtnEl = document.getElementById('submit');
const randomBtnEl = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeadingEl = document.getElementById('result__heading');
const singleMealEl = document.getElementById('single__meal');


function randomMeal(){
    // clear meals and heading 
    mealsEl.innerHTML = '';
    resultHeadingEl.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
        addMealToDOM(data.meals[0]);
    });
}


function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            addMealToDOM(meal);
        });
}

function addMealToDOM(meal) {

    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }

    console.log(ingredients);

    singleMealEl.innerHTML = `
        <div class="single__meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" id="main_meal"/>
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function searchMeal(e) {
    e.preventDefault();
    // Clear single Meal
    singleMealEl.innerHTML = '';
    // Get search Term
    const term = searchBtnEl.value;
    // Check for empty input 
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                resultHeadingEl.innerHTML = `<h2>Search results for '${term}': </h2>`;

                if (data.meals === null) {
                    resultHeadingEl.innerHTML = `There are no search results. Try again!`;
                } else {
                    mealsEl.innerHTML = data.meals.map(meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}"/>
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h4>${meal.strMeal}</h4>
                        </div>
                    </div>
                    `).join('');
                }
            });
        searchBtnEl.value = '';

    } else {
        alert('please enter a keyword to search ...');
    }
}



// EVENT LISTENERS
submitBtnEl.addEventListener('submit', searchMeal);
randomBtnEl.addEventListener('click', randomMeal);
mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });

    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealID');
        getMealById(mealID);
    }
});


