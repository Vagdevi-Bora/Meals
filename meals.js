let searchButton = document.querySelector('.search-btn');
let mealList = document.getElementById("meal");
let mealDetailsContent = document.querySelector('.meal-details-content');
let mealDetails = document.querySelector('.meal-details');
let cancle=document.querySelector('.cancle');
let fav=document.querySelector('.fav');
let starList=[];
let favList=[];



cancle.addEventListener('click',function(){
    mealDetails.style.display="none";
});


searchButton.addEventListener('click', getMealList);
document.addEventListener('click', getMealRecipe);
fav.addEventListener('click',function(){
    addStarList(starList);
});

function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            addMealList(data.meals);
        })
        .catch((e) => {
            console.log(e);
        });
}

function addMealList(data){
    let html = "";
    if (data) {
        data.forEach(meal => {
            html += `
            <div class = "meal-item" data-id = "${meal.idMeal}">
            <div  class="star">
            <i class="fa-solid fa-star"></i>
            </div>    
            <div id = "meal-image">
                <img src = "${meal.strMealThumb}" alt = "food">
                </div>
                <div class = "meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href = "#" target = "_blank" class = "recipe-btn" >Get Recipe</a>
                    </div>
            </div>
        `;
        });
        mealList.classList.remove('notFound');

    }  else {
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add('notFound');
    }
    mealList.innerHTML = html;

}


function getMealRecipe(e) {
    e.preventDefault();
    let mealItem = e.target.parentElement.parentElement;
    if (e.target.classList.contains("recipe-btn")) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
    if(e.target.parentElement.classList.contains("star")){
        // let tag=e.toggle;
    // starList.forEach(item=>{
        // if(item===mealList.dataset.id){
      if(starList.indexOf(mealItem.dataset.id)>-1){
        removeFavItem(mealItem);
        console.log(mealItem.dataset.id,"remove");
        e.target.style.color="rgb(110,110,110)";
        e.target.toggle=false;
      }
    // });
       else{
        addFavouriteList(mealItem);
        console.log(mealItem.dataset.id,"add");
        e.target.style.color="fuchsia";
        e.target.toggle=true;
        
       }
        
    }
}

function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p id="category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div id = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetails.style.display="block";
    // mealDetailsContent.parentElement.classList.add('showRecipe');
}

function  addFavouriteList(mealItem){
  starList.push(mealItem.dataset.id);

//   addStarList(starList);
}

function removeFavItem(mealItem){
    favList=[];
    starList.forEach(item=>{
        if(item!==mealItem.dataset.id){
            favList.push(item);
        }
    })
    starList.splice(0,starList.length);
    starList=favList;
    addStarList(starList);
    console.log(starList);
}

function addStarList(starList){
    let html = "";
    document.getElementById('search-input').value="";
    if(starList.length>0){
  starList.forEach(item=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item}`)
    .then(response=>response.json())
      .then(data=>{
        if(data){
            mealList.innerHTML="";
        // data.meals.forEach(meal=>{
        meal=data.meals;
        meal=meal[0];
        html += `
        <div class = "meal-item" data-id = "${meal.idMeal}">
        <div class="star"  >
        <i class="fa-solid fa-star " style="color:fuchsia;"></i>
        </div>    
        <div id = "meal-image">
            <img src = "${meal.strMealThumb}" alt = "food">
            </div>
            <div class = "meal-name">
                <h3>${meal.strMeal}</h3>
                <a href = "#" class = "recipe-btn">Get Recipe</a>
                </div>
        </div>
    `;   
        // });
    }
    mealList.innerHTML=html;
    mealList.classList.remove('notFound');

 });
    });
}
else{
    mealList.innerHTML="";
    meal.innerHTML="You have no favourite food items!!";
    mealList.classList.add('notFound');

}
}

