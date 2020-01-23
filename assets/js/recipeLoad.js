const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

var dishName = urlParams.get('dish-name')
console.log(dishName);

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
    }).then(function(RecipeRes) {
      console.log(RecipeRes);
      var recipeID = RecipeRes.results[0].id;
      console.log(recipeID);
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
    }).then(function(RecipeInfoRes) {
      console.log(RecipeInfoRes);
      var dataArr = RecipeInfoRes;
      loadRecipe(dataArr);
    });
  }
  
  function loadRecipe(dataArr) {
    var newDiv = $("#recipe-card");
  
    // 1 - DISH TITLE
  
    var title = dataArr.title;
    console.log(title);
    var titleText = $("#dish-title");
    titleText.append(title);
    // newDiv.append(titleText);
    console.log(titleText);
  
    // 2 - DISH IMAGE
  
    var image = dataArr.image;
    console.log(image);
    var imageTAG = $("#dish-image").attr("src", image);
    newDiv.append(imageTAG);
  
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
        // instructLI = $("<li></li>").text(steps[i]);
        // var instructDiv = $("#instructDiv");
        // instructDiv.append(instructLI);
        // newDiv.append(instructDiv);
      }
    }
  
    // 5 - ALLERGY INFO
  
    // 6 - OTHER WINE SUGGESTIONS (SIDE BAR) ++++ WINE IMAGE??
  }