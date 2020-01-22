var wineKEY = "4e2cbd32ae6b47f3acb6348b6fb258f6";

// ClICK ON SEARCH TO START 

$("#searchBtn").click(function () {
  wineDataLoad();

});


// FUNCTION TO LOAD DATA FROM FOOD AND WINE API
<<<<<<< HEAD
=======
    
    function wineDataLoad(){
      
      var wineURL = "https://api.spoonacular.com/food/wine/dishes?wine="
      var userInput = $("#userInput").val().trim();

        $.ajax({
          url: wineURL + userInput,
          method: "GET"
      }).then(function (wineRes) {
        console.log(wineRes)
      var userInput = $("#userInput").val().trim();
      var wineURL = "https://api.spoonacular.com/food/wine/dishes?wine=" + userInput + "&apiKey=" + wineKEY;
>>>>>>> 769bb721f9277cabbff107df3239d98e474a98f8

function wineDataLoad() {

  var userInput = $("#userInput").val().trim();
  var wineURL = "https://api.spoonacular.com/food/wine/dishes?wine=" + userInput + "&apiKey=" + wineKEY;

  // FIRST AJAX CALL - WINE AND FOOD MATCH

  $.ajax({
    url: wineURL,
    method: "GET"
  }).then(function (wineRes) {

    // console.log(wineRes)

    var response1 = (wineRes.text);
    var wineINFO = $("#wineDiv");
    var p = $("<p></p>").text("Wine description: " + response1 + " Choose you recipe below!");
    wineINFO.html(p);

    var response2 = (wineRes.pairings);
    var foodINFO = $("#recipeDiv");

    var foodOPT;
    foodINFO.empty();

    // LOOP THROUGH ALL FOOD RESULTS AND APPEND RECIPE OPTIONS TO THE PAGE

    for (var i = 0; i < response2.length; i++) {
      foodOPT = $("<button></button>").text("Food pairing option " + [i + 1] + ": " + response2[i]).addClass("searches").attr("data-name", response2[i]);
      foodINFO.append(foodOPT);
    };
    //clear input area

    $("#userInput").val("");

    // handling bad requests here

  }).catch(function (err) {
    alert("Please enter the full name of the grape");
  });

<<<<<<< HEAD
};
=======
        foodINFO.empty();
        for (var i = 0; i < response2.length; i++){
          foodOPT = $("<button></button>").text("Food pairing option "+ [i+1] + ": " + response2[i]).addClass("searches").attr("data-name", response2[i]);
          foodINFO.append(foodOPT);
        };
        //clear input area
        $("#userInput").val("");
        
      });
    });
    };
>>>>>>> 769bb721f9277cabbff107df3239d98e474a98f8

// SECOND AJAX CALL - RECIPIES

// this on click event is for the list of suggested food pairings

$("#recipeDiv").on("click", ".searches", function () {

  var foodITEM = $(this).attr("data-name");
  console.log(foodITEM);

  getRecipeId(foodITEM)
});

function getRecipeInfo(recipeInfo) {

  var recipeInfoURL = "https://api.spoonacular.com/recipes/" + recipeInfo + "/information?includeNutrition=false" + "&apiKey=" + wineKEY;

  $.ajax({
    url: recipeInfoURL,
    method: "GET"
  }).then(function (RecipeInfoRes) {
    console.log(RecipeInfoRes)
  });
}

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



















<<<<<<< HEAD
=======
});
};
>>>>>>> 769bb721f9277cabbff107df3239d98e474a98f8
