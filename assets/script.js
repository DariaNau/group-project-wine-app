var wineKEY = "4e2cbd32ae6b47f3acb6348b6fb258f6";


    $("#searchBtn").click(function(){
      wineDataLoad();

    });
    
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

        $.ajax({
          url: wineURL,
          method: "GET"
      }).then(function (wineRes) {

        console.log(wineRes)
        
        var response1 = (wineRes.text);
        var wineINFO = $("#wineDiv");
        var p = $("<p></p>").text("Wine description: " + response1);
        wineINFO.html(p);

        var response2 = (wineRes.pairings);
        var foodINFO = $("#recipeDiv");

        foodINFO.empty();
        for (var i = 0; i < response2.length; i++){
          var li = $("<li></li>").text("Option "+ [i+1] + ": " + response2[i]);
          foodINFO.append(li);
        };
        $("#userInput").val("");
        
      });
    });
    };