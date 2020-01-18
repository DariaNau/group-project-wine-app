$( document ).ready(function() {
    console.log( "ready!" );
  
    $("button").click(function(){
      $.ajax({url: , 
        success: function(result){
        $("div").html(result);
      }});
    });
  });