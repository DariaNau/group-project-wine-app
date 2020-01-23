// $(document).ready(function) {


// function showPic() {
//   var alb = document.getElementById("#albarino");
//   if (userInput === "albarino") {
//     $(".btn").click(function(){
//       $("#albarino").show();
//   });

//   } else {
//     alb.style.display = "none";
//   }
// }

//         $(".btn1").click(function(){
//           $("p").hide();
//         });


//         });
//       });
// };




$("#searchBtn").click(function () {
  winePic();

});

function winePic() {

  var userInput = $("#userInput").val().trim();
  var PixApi = "15004714-f70ecef57d334669bf16638ab";
  var pixURL = "https://pixabay.com/api/?key=" + PixApi + "&q=" + userInput + "&image_type=photo";


  $.ajax({
    url: pixURL,
    method: "GET",
  }).then(function (resp) {
    resp.html
    console.log(pixURL)
    console.log(resp.hits[0].largeImageURL)
    var url = resp.hits[0].largeImageURL
    $('#winepix').attr('src', url)
  });
};


// };


//  function getRecipe(){

//     var ingInput = $("#ingInput").val().trim();
//     var recipeURL = "https://api.edamam.com/searchq=" + ingInput + "&app_id=0513e701&"  + "&app_key=" + recApiKey;

//       $.ajax({
//         url: recipeURL,
//         method: "GET"
//     }).then(function (recipes) {
//       console.log(recipes.text)

//       var recipe = document.createElement("div");
//       wineINFO.html = (recipes.text);

//       var foodINFO = document.createElement("div1");
//       foodINFO.html = (recipes.pairings);

//     });
//   };


//Create a new object to interact with the server
// var xhr = new XMLHttpRequest();

// var url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch='New_England_Patriots'";

// // Provide 3 arguments (GET/POST, The URL, Async True/False)
// xhr.open('GET', url, true);

// // Once request has loaded...
// xhr.onload = function() {
//     // Parse the request into JSON
//     var data = JSON.parse(this.response);

//     // Log the data object
//     console.log(data);

//     // Log the page objects
//     console.log(data.query.pages)

//     // Loop through the data object
//     // Pulling out the titles of each page
//     for (var i in data.query.pages) {
//         console.log(data.query.pages[i].title);
//     }
// }
// // Send request to the server asynchronously
// xhr.send();
