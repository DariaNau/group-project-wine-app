// LOADER ACTIVATED

$(window).on("load",function(){
  $(".loader-wrapper").fadeOut("slow");
});

// GLOBAL VARS

var foodINFO = $("#recipeDiv");
var foodOPT;
var wineKEY = "4e2cbd32ae6b47f3acb6348b6fb258f6";

// if enter is pressed by user trigger the on(click) function

$("#userInput").keyup(function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#searchBtn").click();
  }
});

// ClICK ON SEARCH TO START

$("#searchBtn").click(function() {
  // var term = $("#userInput").val().trim()
  // if(!suggestedSearch.includes(term)){
  //   suggestedSearch.push(term)
  // }
  wineDataLoad();
});


// MOST POPULAR SEARCHES - BACK UP CODE IN CASE ALGOLIA FAILS

// const suggestedSearch = ['Albarino', 'Beaujolais','Cabernet Sauvignon', 'Cava', 'Champagne', 'Chardonnay', 'Chenin Blanc', 'Grenache', 'Malbec', 'Merlot', 'Pinot Grigio', 'Pinot Noir', 'Sauvignon Blanc', 'Zinfandel'];
// $("#userInput").keydown(function(){
//     var val = $(this).val()
//     $("#suggestedSearch").html("")

//     for(var i = 0; i < suggestedSearch.length; i++){
//         if(suggestedSearch[i].includes(val)){
//             var item = $("<div>").text(suggestedSearch[i]).addClass('selectSearch')
//             $("#suggestedSearch").append(item)
//         }
//     }
// });
// $(document).on("click", ".selectSearch", function(){
//     var searchItem = $(this).text()
//     $("#suggestedSearch").html("")
//     $('#userInput').val(searchItem)
// })

function wineDataLoad() {
  var userInput = $("#userInput")
    .val()
    .trim();
  var wineURL =
    "https://api.spoonacular.com/food/wine/dishes?wine=" +
    userInput +
    "&apiKey=" +
    wineKEY;

  // 1ST AJAX CALL - WINE AND FOOD MATCH

  $.ajax({
    url: wineURL,
    method: "GET"
  })
    .then(function(wineRes) {
      var response1 = wineRes.text;

      // APPEND RESPONSE ONE (WINE DESCRIPTION) AND SET TO LOCAL STORAGE
      var wineINFO = $("#wineDiv");
      var grapeName = $("<p></p>").text(userInput);
      wineINFO.html(grapeName);
      var p = $("<p></p>").text(
      response1 + " Please select a style of food you're in the mood for to see the recipe!"
      );
      wineINFO.append(p);
      var response2 = wineRes.pairings;
      localStorage.setItem("response2", JSON.stringify(response2));
      localStorage.setItem("response1", JSON.stringify(response1));
      foodINFO.empty();

      // APPEND RESPONSE TWO (MATCHED FOOD), LINK TO RECIPELOAD.JS, AND SET TO LOCAL STORAGE
      var response2Local = JSON.parse(localStorage.getItem("response2"));
      for (var i = 0; i < response2Local.length; i++) {
        foodOPT = $("<a><button></button></a>")
          .text("Food pairing option " + [i + 1] + ": " + response2Local[i])
          .addClass("pure-button searches")
          .attr("data-name", response2Local[i]);
          var dish = (response2Local[i]);
          foodOPT.attr("href", "recipe.html" + "?dish-name=" + dish);
          foodINFO.append(foodOPT);
      }

      // clear input area

      $("#userInput").val("");

      // handling bad requests

    })
    .catch(function(err) {
      Swal.fire({
        title: "Oops!",
        text: "Please enter a valid name of a grape varietal.",
        icon: "error",
        confirmButtonText: "Got it"
      });
    });
}

// LOCAL STORAGE

function renderButtons() {
  var response2Local = JSON.parse(localStorage.getItem("response2")) || [];
  for (var i = 0; i < response2Local.length; i++) {
    foodOPT = $("<a><button></button></a>")
      .text("Food pairing option " + [i + 1] + ": " + response2Local[i])
      .addClass("pure-button searches")
      .attr("data-name", response2Local[i]);
      var dish = (response2Local[i]);
    foodOPT.attr("href", "recipe.html" + "?dish-name=" + dish);
    foodINFO.append(foodOPT);
  }
}

function renderSearchInfo() {


}

function init() {
  renderButtons();
}

init();






