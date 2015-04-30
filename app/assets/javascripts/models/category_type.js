MyMoney.Models.CategoryType = MyMoney.Models.BaseModel.extend({

  urlRoot: 'category_types',

  parse : function(response, xhr) {
    return response.category_type || response;
  }

});
