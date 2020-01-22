var foodINFO = $("#recipeDiv");
var foodOPT;
var wineKEY = "4e2cbd32ae6b47f3acb6348b6fb258f6";

//if enter is pressed by user trigger the on(click) function

$("#userInput").keyup(function (event) {
  if (event.keyCode === 13) {
      event.preventDefault();
      $("#searchBtn").click();
  }
});

// ClICK ON SEARCH TO START 

$("#searchBtn").click(function () {
  wineDataLoad();
});

// FUNCTION TO LOAD DATA FROM FOOD AND WINE API

function wineDataLoad() {

  var userInput = $("#userInput").val().trim();
  var wineURL = "https://api.spoonacular.com/food/wine/dishes?wine=" + userInput + "&apiKey=" + wineKEY;

  // FIRST AJAX CALL - WINE AND FOOD MATCH

  $.ajax({
    url: wineURL,
    method: "GET"
  }).then(function (wineRes) {
    var response1 = (wineRes.text);
    var wineINFO = $("#wineDiv");
    var p = $("<p></p>").text("Wine description: " + response1 + " Choose you recipe below!");
    wineINFO.html(p);
    var response2 = (wineRes.pairings);
    localStorage.setItem('response2', JSON.stringify(response2));
    foodINFO.empty();

    // LOOP THROUGH ALL FOOD RESULTS AND APPEND RECIPE OPTIONS TO THE PAGE

    var response2Local = JSON.parse( localStorage.getItem('response2'))
    for (var i = 0; i < response2Local.length; i++) {
      foodOPT = $("<button></button>").text("Food pairing option " + [i + 1] + ": " + response2Local[i]).addClass("searches").attr("data-name", response2Local[i]);
      foodINFO.append(foodOPT);
    };

    //clear input area

    $("#userInput").val("");

    // handling bad requests here

  }).catch(function (err) {
    Swal.fire({
      title: 'Oops!',
      text: 'Please enter a valid name of grape varietal.',
      icon: 'error',
      confirmButtonText: 'Got it'
    })
  });
};






// function renderButtons() {
//   var response2Local = JSON.parse( localStorage.getItem('response2'));
//     for (var i = 0; i < response2Local.length; i++) {
//       foodOPT = $("<button></button>").text("Food pairing option " + [i + 1] + ": " + response2Local[i]).addClass("searches").attr("data-name", response2Local[i]);
//       foodINFO.append(foodOPT);
//     };
// }

// function init() {
//   renderButtons();
// }

// init();





// SECOND AJAX CALL - RECIPIES

$("#recipeDiv").on("click", ".searches", function () {
  var foodITEM = $(this).attr("data-name");
  getRecipeId(foodITEM)
});

function getRecipeId(foodITEM) {
      var recipeURL = "https://api.spoonacular.com/recipes/autocomplete?number=1&query=" + foodITEM + "&apiKey=" + wineKEY;
      $.ajax({
        url: recipeURL,
        method: "GET"
      }).then(function (RecipeRes) {
        var recipeInfo = RecipeRes[0].id;
        console.log(RecipeRes)
        console.log(recipeInfo)
        getRecipeInfo(recipeInfo)
      });
    }

function getRecipeInfo(recipeInfo) {
  var recipeInfoURL = "https://api.spoonacular.com/recipes/" + recipeInfo + "/information?includeNutrition=false" + "&apiKey=" + wineKEY;
  $.ajax({
    url: recipeInfoURL,
    method: "GET"
  }).then(function (RecipeInfoRes) {
    console.log(RecipeInfoRes)
  });
}

function loadRecipe () {

  var title = RecipeInfoRes.title;
  var titleText = $("<div></div>").text(title);

  var image = RecipeInfoRes.image;

};

// link recipe.html
