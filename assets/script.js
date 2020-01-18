var wineKEY = "4e2cbd32ae6b47f3acb6348b6fb258f6";


    $("#searchBtn").click(function(){
      wineDataLoad();

    });
    
    function wineDataLoad(){
      
      var userInput = $("#userInput").val().trim();
      var wineURL = "https://api.spoonacular.com/food/wine/dishes?wine=" + userInput + "&apiKey=" + wineKEY;

        $.ajax({
          url: wineURL,
          method: "GET"
      }).then(function (wineRes) {
        console.log(wineRes.text)
        
        var wineINFO = document.createElement("div");
        wineINFO.html = (wineRes.text);

        var foodINFO = document.createElement("div1");
        foodINFO.html = (wineRes.pairings);

      });
    };



  