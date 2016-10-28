$(function(){
  var commands,
    getResult = function(val) {
      console.log("at val #####", val);
      var val = {"data": val};

      $.ajax({
        url: '/getresult',
        data: val,
        type: 'POST',
        data: JSON.stringify(val),
        contentType: 'application/json;charset=UTF-8',
        success: function(response){
          var result = JSON.parse(response).resp;

          console.log(JSON.parse(response).resp);
          $('#result').val(result);
        },
        error: function(error){
        	console.log(error);
        }
      });
    };

  $( window ).load(function() {
    // Run code
    console.log("loaded")
    $.ajax({
      url: '/onload',
      type: 'GET',
      success: function(response){
      	commands = JSON.parse(response).resp;
        console.log(commands);
        $('#english')
        .on('keydown', function(event){
          //console.log("event ****", event, typeof($( this ).autocomplete));
          if ( event.keyCode === $.ui.keyCode.TAB &&
            $( this ).autocomplete( "instance" ).menu.active ) {
          //console.log("event ****", event);
              event.preventDefault();
          } else if (event.keyCode === $.ui.keyCode.ENTER) {
            var val = $('#english').val();

            getResult(val);
          }
        })
        .autocomplete({
          minLength:1,
          delay:500,
          source: function(request, response) {
            var results = $.ui.autocomplete.filter(commands, request.term);

            response(results.slice(0, 10));
          }
          //select: function( event, ui ) {
          //  var terms = this.value;
          //  console.log("at select *****", terms);
          //}
        });
      },
      error: function(error){
      	console.log(error);
      }
    });
  });
  console.log("commands", commands);

  $('#').on('keydown', (function(event){
    var user = $('#english').val();
    var pass = $('#other').val();
    console.log(event);
    return;

  }));
});
