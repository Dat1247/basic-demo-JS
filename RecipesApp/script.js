const meals = document.getElementById("meals");
const favoriteContainer = document.querySelector('.fav-meal');
const searchTerm = document.getElementById('search-term');
const search = document.getElementById('search');

const popupMeal = document.getElementById('popup-container');
const btnClose = document.getElementById('btnClose');
const mealInfo = document.getElementById('meal-info');


getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    const respData = await resp.json();
    const meal = respData.meals[0];

    return meal;
}

async function getMealsBySearch(term) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term);
    const respData = await resp.json();
    return respData.meals;
}

function addMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
            <div class="meal-header">
                ${random ? `<span class="random">
                Random Recipe
                </span>` : ''}
                <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
            </div>
            <div class="meal-body">
                <h4>${mealData.strMeal}</h4>
                <button class="fav-btn">
                    <i class="fa fa-heart"></i>
                </button>
            </div>
    `;

    meal.querySelector('.meal-body .fav-btn').addEventListener('click', (e)=>{
        if(e.target.classList.contains('active')){
            removeMealFromLS(mealData.idMeal);
            e.target.classList.remove('active');
        } else{
            addMealToLS(mealData.idMeal);
            e.target.classList.toggle('active');
        }

        fetchFavMeals();
    });

    meal.querySelector('.meal-header').addEventListener('click', ()=>{
        showMealInfo(mealData);
    })
    
    meals.appendChild(meal);
}

function addMealToLS(mealId){
    const mealIds = getMealFromLS();
    const jsonMeal = JSON.stringify([...mealIds, mealId]);

    localStorage.setItem('mealIds', jsonMeal);
}

function removeMealFromLS(mealId){
    const mealIds = getMealFromLS();

    localStorage.setItem("mealIds", JSON.stringify(mealIds.filter((id) => id !== mealId)));
}

function getMealFromLS(){
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals(){
    favoriteContainer.innerHTML = '';

    const mealIds = getMealFromLS();
    const meals = [];

    for(let  i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        let meal = await getMealById(mealId);
        meals.push(meal);
        addMealFav(meal);
    }
}

function addMealFav(mealData){
    const favMeal = document.createElement('li');
    favMeal.innerHTML = `
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    favMeal.querySelector('img').addEventListener('click', () =>{
        showMealInfo(mealData);
    });

    favMeal.querySelector(".clear").addEventListener('click', () =>{
        removeMealFromLS(mealData.idMeal);
        fetchFavMeals();
    });

    
    favoriteContainer.appendChild(favMeal);
}

function showMealInfo(mealData){
    mealInfo.innerHTML = "";
    const mealEl = document.createElement('div');

    const ingredients = [];
    for(let i = 1; i <= 20; i++){
        if(mealData['strIngredient'+i]){
            ingredients.push(`${mealData['strIngredient'+i]} - ${mealData['strMeasure'+i]}`)
        } else{
            break;
        }
    }
    let contentEl = ingredients.reduce((content, item, index)=>{
        content += `
            <li>${item}</li>
        `;
        return content;
    }, "");

    mealEl.innerHTML = `
        <h3>${mealData.strMeal}</h3>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <p>${mealData.strInstructions}<p>
        <h2>Ingredients - Measure</h2>
        <ul>
            ${contentEl}
        </ul>
    `;

    mealInfo.appendChild(mealEl);

    popupMeal.classList.remove("hidden");
}


search.addEventListener('click', async () =>{
    meals.innerHTML = '';
    const searchValue = searchTerm.value;

    const data = await getMealsBySearch(searchValue);

    if(data){
        data.forEach((meal) => {
            addMeal(meal);
        })
    }

    searchTerm.value = "";
})

btnClose.addEventListener("click", () =>{
    popupMeal.classList.add("hidden");
})