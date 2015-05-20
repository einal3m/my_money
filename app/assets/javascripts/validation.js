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
  isShare: function (value, attr, options, model) {
    console.log('isShare');
    if(_.isBlank(value)) {
      return '';
    }

    var lockDate = model.lockDate();
    if(_.isBlank(lockDate)) {
      return '';
    }

    if (!moment(value).isAfter(lockDate)) {
      var msg = options.msg || 'Date must be after lock date of ' + DateUtils.toFrontendDate(lockDate);
      return msg;
    }
  },
  money: function(value, attr, customValue, model) {
    if(value !== customValue){
      return 'error';
    }
  }
});
