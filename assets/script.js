var wineKEY = "4e2cbd32ae6b47f3acb6348b6fb258f6";

// ClICK ON SEARCH TO START 

    $("#searchBtn").click(function(){
      wineDataLoad();

    });

// FUNCTION TO LOAD DATA FROM FOOD AND WINE API
    
    function wineDataLoad(){
      
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

// LOOP THROUGH ALL FOOD RESULTS AND APPEND TO THE PAGE

        foodINFO.empty();
        for (var i = 0; i < response2.length; i++){
          foodOPT = $("<button></button>").text("Food pairing option "+ [i+1] + ": " + response2[i]).addClass("searches").attr("data-name", response2[i]);
          foodINFO.append(foodOPT);
        };
        //clear input area
        $("#userInput").val("");

// SECOND AJAX CALL - RECIPIES

// this on click event is for the list of suggested food pairings
$("#recipeDiv").on("click", ".searches", function () {
 
      var foodITEM = $(this).attr("data-name");
      console.log(foodITEM);
      var recipeURL = "https://api.spoonacular.com/recipes/autocomplete?number=5&query=" + foodITEM + "&apiKey=" + wineKEY;

        $.ajax({
          url: recipeURL,
          method: "GET"
      }).then(function (RecipeRes) {
        console.log(RecipeRes)

        
    });
  });





})};