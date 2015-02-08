MyMoney.Models.Reconciliation = Backbone.Model.extend({

  parse : function(resp, xhr) {
		return resp["reconciliation"] || resp;
  }

  // url: function() {
  // 	return 'accounts/' + this.for_account + '/reconciliations/last';
  // },

});

// MoveCollection = Backbone.Collection.extend({
 
//    model: MovieModel,
 
//    urlRoot: 'http://api.rottentomatoes.com/api/public/v1.0/',
//    apikey: 'xxx', 
//    listSrc: 'box_office',
 
//    url: function () {
//       return _.result(this, 'urlRoot') + 'lists/movies/' + this.listSrc + '.json?apikey=' + this.apikey;
//    },
 
//    load: function ( dbd ) {
 
//       this.listSrc = lsrc || 'box_office';
       
//       /* Allow the url function to build the url used in the fetch */
//       return this.fetch();
 
//    }
 
// });
 
// var MovieModel = Backbone.Model.extend({
    
//    /* The urlRoot is now the common path between the collection and model */
//    url: function () {
//       return _.result(this.collection, 'urlRoot')+'movies/'+this.id+'.json?apikey='+this.collection.apikey;
//    },
 
// });