var foodINFO = $("#recipeDiv");
var foodOPT;
var wineKEY = "4e2cbd32ae6b47f3acb6348b6fb258f6";

// if enter is pressed by user trigger the on(click) function

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

function wineDataLoad() {

  var userInput = $("#userInput").val().trim();
  var wineURL = "https://api.spoonacular.com/food/wine/dishes?wine=" + userInput + "&apiKey=" + wineKEY;

// 1ST AJAX CALL - WINE AND FOOD MATCH

  $.ajax({
    url: wineURL,
    method: "GET"
  }).then(function (wineRes) {
    var response1 = (wineRes.text);
    console.log(wineRes);

    var wineINFO = $("#wineDiv");
    var grapeName = $("<p></p>").text(userInput);
    wineINFO.html(grapeName);
    var p = $("<p></p>").text("Great choice! " + response1 + " Choose you recipe below!");
    wineINFO.append(p);
    var response2 = (wineRes.pairings);
    localStorage.setItem('response2', JSON.stringify(response2));
    foodINFO.empty();

    // Loop to append pairing options

    var response2Local = JSON.parse( localStorage.getItem('response2'))
    for (var i = 0; i < response2Local.length; i++) {
      foodOPT = $("<button></button>").text("Food pairing option " + [i + 1] + ": " + response2Local[i]).addClass("searches").attr("data-name", response2Local[i]);
      foodINFO.append(foodOPT);
    };

    //clear input area

    $("#userInput").val("");

    // handling bad requests

  }).catch(function (err) {
    Swal.fire({
      title: 'Oops!',
      text: 'Please enter a valid name of a grape varietal.',
      icon: 'error',
      confirmButtonText: 'Got it'
    })
  });
};


// ------------------------LOCAL STORAGE TO FINISH

function renderButtons() {
  var response2Local = JSON.parse( localStorage.getItem('response2'));
    for (var i = 0; i < response2Local.length; i++) {
      foodOPT = $("<button></button>").text("Food pairing option " + [i + 1] + ": " + response2Local[i]).addClass("searches").attr("data-name", response2Local[i]);
      foodINFO.append(foodOPT);
    };
}

function init() {
  renderButtons();
}

init();

// ------------------------LOCAL STORAGE TO FINISH


// 2ND AJAX CALL - FOR RECIPIES!

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
        var recipeID = RecipeRes[0].id;
        getRecipeInfo(recipeInfo);
      });
      }

function getRecipeInfo(recipeID) {
  var recipeInfoURL = "https://api.spoonacular.com/recipes/" + recipeID + "/information?includeNutrition=false" + "&apiKey=" + wineKEY;
  $.ajax({
    url: recipeInfoURL,
    method: "GET"
  }).then(function (RecipeInfoRes) {
    console.log(RecipeInfoRes);
  });
};

// Load recipe.html page

function loadRecipe () {

  // 1 - DISH TITLE

  var title = RecipeInfoRes.title;
  console.log(title)
  var titleText = $("<div></div>").text(title);

  // 2 - DISH IMAGE

  var image = RecipeInfoRes.image;
  console.log(image)

  // 3 - INGRIDIENTS



  // 4 - INSTRUCTIONS


  // 5 - ALLERGY INFO


  // 6 - OTHER WINE SUGGESTIONS (SIDE BAR) ++++ WINE IMAGE??

};

// link recipe.html
