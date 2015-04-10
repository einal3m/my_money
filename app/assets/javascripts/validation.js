_.extend(Backbone.Model.prototype, Backbone.Validation.mixin);

_.extend(Backbone.Validation.callbacks, {
    valid: function (view, attr, selector) {
        var $el = view.$('[name=' + attr + ']') ,
            $group = $el.closest('.form-group');
        
        $group.removeClass('has-error');
        $group.find('.help-block').html('').addClass('hidden');
    },
    invalid: function (view, attr, error, selector) {
        var $el = view.$('[name=' + attr + ']'),
            $group = $el.closest('.form-group');
        $group.addClass('has-error');
        $group.find('.help-block').html(error).removeClass('hidden');
    }
});

_.extend(Backbone.Validation.validators, {
  money: function(value, attr, customValue, model) {
    if(value !== customValue){
      return 'error';
    }
  }
});