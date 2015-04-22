
beforeEach(function(){
  spyOn( $, 'ajax' ).and.callFake( function (params) { 
    throw "Error: " + params.type + " " + params.url + " not allowed in tests.";
  });
});
