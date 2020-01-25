// LOADER ACTIVATED

$(window).on("load",function(){
  $(".loader-wrapper").fadeOut("slow");
});

//1

// $(window).on("reload",function(){
//   localStorage.removeItem("response1");
//   localStorage.removeItem("response2");
// });

//2

// window.onbeforeunload = function() {
//   localStorage.removeItem("response2");
//   localStorage.removeItem("response1");
// }

//3 

// window.onbeforeunload = function (e) {
//   window.onunload = function () {
//           window.sessionStorage.isMySessionActive = "false";
//   }
//   return undefined;
// };

// window.onload = function () {
//           window.sessionStorage.isMySessionActive = "true";
// };

// GLOBAL VARS

var wineINFO = $("#wineDiv");
var foodINFO = $("#recipeDiv");
var foodOPT;
var wineKEY = "50e942eafbb0432890384d40751871de";
// extra key 6889c76ff69c4a49aa7f5c9d4c6dd71c

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
      // APPEND RESPONSE ONE (WINE DESCRIPTION) AND SET TO LOCAL STORAGE
      var response1 = wineRes.text;
      console.log(response1)
      sessionStorage.setItem("response1", JSON.stringify(response1));
      wineINFO.empty();

      var grapeName = $("<p></p>").text(userInput).addClass("grapename");
      wineINFO.prepend(grapeName);

      var response1Local = JSON.parse(sessionStorage.getItem("response1"));
      var p = $("<p></p>").text(response1Local + " Please select a style of food you're in the mood for to see the recipe!").addClass("wine-res");
      wineINFO.append(p);
      
      var response2 = wineRes.pairings;
      sessionStorage.setItem("response2", JSON.stringify(response2));
      foodINFO.empty();

      // APPEND RESPONSE TWO (MATCHED FOOD), LINK TO RECIPELOAD.JS, AND SET TO LOCAL STORAGE
      var response2Local = JSON.parse(sessionStorage.getItem("response2"));
      for (var i = 0; i < response2Local.length; i++) {
        foodOPT = $("<a><button></button></a>")
          .text(response2Local[i])
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

function renderSearchInfo() {
  var response1Local = JSON.parse(sessionStorage.getItem("response1")) || [];
  console.log(response1Local)
  var p = $("<div></div>").text(response1Local).addClass("wine-res");
    wineINFO.append(p);
}

function renderButtons() {
  var response2Local = JSON.parse(sessionStorage.getItem("response2")) || [];
  console.log(response2Local)
  for (var i = 0; i < response2Local.length; i++) {
    foodOPT = $("<a><button></button></a>")
      .text(response2Local[i])
      .addClass("pure-button searches")
      .attr("data-name", response2Local[i]);
      var dish = (response2Local[i]);
    foodOPT.attr("href", "recipe.html" + "?dish-name=" + dish);
    foodINFO.append(foodOPT);
  }
}

function init() {
  renderSearchInfo();
  renderButtons();
}

init();


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





