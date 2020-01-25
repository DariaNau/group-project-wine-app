// LOADER ACTIVATED

$(".content").hide();
$(window).on("load", function () {
  $(".loader-wrapper").fadeOut("slow");
});

// GLOBAL VARS (PASSING DATA FROM SCRIPT>JS VIA URL PARAMETERS)

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var dishName = urlParams.get('dish-name')

// GET RECIPE BY ID RUNS AND CHAINS OTHER FUNCTIONS TO IT (LOAD AND APPEND)

getRecipeId(dishName);

function getRecipeId(dishName) {
  var recipeURL =
    "https://api.spoonacular.com/recipes/search?query=" +
    dishName +
    "&number=1" +
    "&apiKey=" +
    wineKEY;
  $.ajax({
    url: recipeURL,
    method: "GET"
  }).then(function (RecipeRes) {
    var recipeID = RecipeRes.results[0].id;
    getRecipeInfo(recipeID);
  });
};

function getRecipeInfo(recipeID) {
  var recipeInfoURL =
    "https://api.spoonacular.com/recipes/" +
    recipeID +
    "/information?includeNutrition=false" +
    "&apiKey=" +
    wineKEY;
  $.ajax({
    url: recipeInfoURL,
    method: "GET"
  }).then(function (RecipeInfoRes) {
    console.log(RecipeInfoRes);
    var dataArr = RecipeInfoRes;
    loadRecipe(dataArr);
  });
}

function loadRecipe(dataArr) {

  var newDiv = $("#recipe-card");
   $(".content").show();

  // 1 - DISH TITLE

  var title = dataArr.title;
  var titleText = $("#dish-title");
  titleText.append(title);
  newDiv.prepend(titleText);

  // 2 - DISH IMAGE

  var image = dataArr.image;
  var imageTAG = $("#dish-image").attr("src", image);
  imageTAG.html(image);

  // 3 - INGRIDIENTS

  var ingList = dataArr.extendedIngredients;
  for (var i = 0; i < ingList.length; i++) {
    ingredLI = $("<li></li>").text(ingList[i].originalString);
    console.log(ingList[i].originalString);
    var ingrDiv = $("#ingridientsDiv");
    ingrDiv.append(ingredLI);
  }

  // 4 - INSTRUCTIONS

  var instructList = dataArr.analyzedInstructions;
  console.log(instructList);

  for (var i = 0; i < instructList.length; i++) {
    console.log(instructList[i].steps);
    var steps = instructList[i].steps;
    console.log(steps);
    for (var i = 0; i < steps.length; i++) {
      console.log(steps[i].step);
      instructOL = $("<li>").text(steps[i].step);
      var instructDiv = $("#instructDiv");
      instructDiv.append(instructOL);
      newDiv.append(instructDiv);
    }
  }

  // 5 - ALLERGY INFO

  var diet = dataArr.diets;
  for (var i = 0; i < diet.length; i++) {
    dietText = $("<button>").text(diet[i]).addClass("pure-button");
    dietDiv = $("#diets");
    dietDiv.append(dietText);
    newDiv.append(dietDiv);
  }
};
