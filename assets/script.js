var wineKEY = "4e2cbd32ae6b47f3acb6348b6fb258f6";


    $("#searchBtn").click(function(){
      wineDataLoad();

    });
    
    function wineDataLoad(){
      
      var wineURL = "https://api.spoonacular.com/food/wine/dishes?wine="
      var userInput = $("input").val().trim();

        $.ajax({
          url: wineURL + userInput + wineKEY,
          method: "GET"
      }).then(function (wineRes) {
        console.log(wineRes)
      });
    };



  