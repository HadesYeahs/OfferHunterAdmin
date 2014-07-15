define([
  'jquery'
], function($){
  $.fn.serializeObject = function() {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
  };

  $.fn.value = function(aValue) {

    var sType = this.attr('type'), tagName = this.prop('tagName'), sValue;
    if(tagName == 'INPUT') {
      if(sType == 'checkbox' || sType == 'radio') {
        if(aValue) {

        } else {
          sValue = {};
          sValue[this.filter(':checked').val()] = this.filter(':checked').data('description');
        }
      } else {
        if(this.hasClass('select2-offscreen')) {
          if(aValue){
            if($.isPlainObject(aValue)) {
              var res = {};
              for(var key in aValue) break;
              res['id'] = key;
              res['text'] = aValue[key];
              this.select2('data', res);
            }
          } else {
            sValue = {};
            if($.isPlainObject(this.select2('data'))) {
              sValue[this.select2('data')['id']] = this.select2('data')['text'];
            }
          }
        } else {
          if(aValue) {
            this.val(aValue);
          } else {
            sValue = this.val();
          }
        }
      }     
    } else if(tagName == 'DIV') {
      if(aValue) {
        if(this.find('input[data-description="'+aValue+'"]').length) {
          this.find('input[data-description="'+aValue+'"]').prop('checked', true);
        } else {
          this.find('input[value="'+aValue+'"]').prop('checked', true);
        }
      } else {
        sValue = {};
        sValue[this.find('input:checked').val()] = this.find('input:checked').data('description');
      }
    } else if(tagName == 'TEXTAREA') {
      if(aValue) {
        this.val(aValue);
      } else {
       sValue = this.val();
      }
    }

    return sValue;    
  }
});