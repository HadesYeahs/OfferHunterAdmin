define([
  'jquery',
  'lodash',
  'backbone',
  'uploader',
  'timepicker',
  'text!templates/forms/field.html'
], function($, _, Backbone, Uploader,Timepicker,FieldTemplate){
  var FieldView = Backbone.View.extend({
    render: function () {
      var self = this,
      aTemplate = _.template(FieldTemplate),
      aField = self.options.field,
      aValue = self.options.value || aField.defaultValue,
      $el = $(aTemplate({name:aField.name, label:aField.label})),
      $input;

      switch(aField.type) {
        case 'numeric': 
          $input = $('<input/>', {type:'numeric'});
          break;
        case 'text': 
          $input = $('<input/>', {type:'text'});
          break;
        case 'textarea':
          $input = $('<textarea/>');
          break;
        case 'password': 
          $input = $('<input/>', {type:'password'});
          break;
		case 'time': 
          $input = $('<input/>', {type:'text'});
		  $input.timepicker({ 'timeFormat': 'H:i' });
          break;
        case 'single_choice':
          $input = $('<div/>');
          if(aField.answers) {
            for(var i=0; i<aField.answers.length; i++) {
              if($.isPlainObject(aField.answers[i])) {
                var text = aField.answers[i].text, value = aField.answers[i].value;
              } else {
                var text = aField.answers[i], value = aField.answers[i];
              }
              $input.append('<label class="radio-inline"><input data-description="'+ text +'" type="radio" name='+aField.name+' value='+ value +'>'+ text +'</label>');
            }
            $input.append('<label for="'+ aField.name +'" class="error"></label>')
          }          
          break;
        case 'list':
          $input = $('<input/>', {type:'hidden'})
          break;
        case 'header':
          return $input = $('<h4>'+ aField.label + '</h4>');
		case 'map':
			$input = $('<input/>', {type:'hidden'});
			$input2 = $('<div/>',{class:"map",style:'width: 100%;height: 200px;','data-valuemap': aValue});
			
			google.maps.event.addDomListener($(".map"), "load", this.loadMap(aValue,aField));
			/*var markersArray = [];
			var mapOptions = {
			  center: new google.maps.LatLng(22.216035, -97.857869),
			  zoom: 10,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			//var map = new google.maps.Map($(".map")[0],mapOptions);
			var map = new google.maps.Map($input2[0],mapOptions);
			google.maps.event.addListener(map, 'click', function(event) {
				var marker = new google.maps.Marker({
				position: event.latLng});
				if(markersArray.length>0)
				{
					markersArray[0].setMap(null);
					markersArray.length = 0;
				}
				marker.setMap(map);
				markersArray.push(marker);
				map.setCenter(event.latLng);
				value = event.latLng.toString();
				value = value.substring(1, value.length-1);
				aValue = value;
				$('[name="'+ aField.name+'"]').value(aValue);
				
			});*/
			break;
		case 'sucursalPadre':
          $input = $('<input/>', {type:'hidden'});
		  $input.val($('[name="selectuser"]').val());
          break;
		case 'file':
			//$input = $('<input/>', {type:'hidden'});
			if(aField.name == "logo")
				var paramUp = "clilogo";
			else
				var paramUp = "oferimg";
			$input = $('<input/>', {id:"file_"+aField.name,type:'hidden'});
			$input2 = $('<div/>',{id:"divfile_"+aField.name,style:'width: 100%;height: 80px;'});
			var uploader = new qq.FileUploader({
				element: $input2[0],
				action: 'upload',
				params:{
					pathname:paramUp
	            },
				onComplete: function(id, fileName, responseJSON){
					var oldval = $("#file_"+aField.name).val();
					if(oldval != "")
					{
						$("#file_"+aField.name).val(oldval+","+responseJSON.filename);
					}else
					{
						$("#file_"+aField.name).val(responseJSON.filename);
					}
				}
			});
			//si tiene valores.
			if(aValue !== undefined)
			{	
				var valuearray = aValue.split(",");
				for(var i=0; i<valuearray.length; i++) {
					var li = $('<li/>',{class:"qq-upload-success Bdelete"});
					li.append($('<span/>',{class:"qq-upload-file"}).html(valuearray[i]));
					//li.append($('<span/>',{class:"qq-upload-size",style:"display: inline"}).html("n/dkB"));
					li.append($('<a/>',{class:"qq-upload-Bdelete ui-link",style:"display: inline"}).html("Delete"));
					$input2.find(".qq-upload-list").append(li);
				}
				
			}
			break;
        case 'hidden':
          $input = $('<input/>', {type:'hidden'});
          break; 
      }

      if(aField.type != 'single_choice') {
        $input.addClass('form-control')
        $input.attr('name', aField.name);
        $input.attr('placeholder', aField.label);  
      }
	  
	   if(aField.type == 'map'|| aField.type == 'file' ) { 
	   $formControl = $el.find('.control').empty().append($input,$input2, $('<span/>', {'class':'help-block'}).html((aField.helpText ? aField.helpText : '')));
      }else
	  {
	   $formControl = $el.find('.control').empty().append($input, $('<span/>', {'class':'help-block'}).html((aField.helpText ? aField.helpText : '')));
	  }
      
      //$formControl = $el.find('.control').empty().append($input, $('<span/>', {'class':'help-block'}).html((aField.helpText ? aField.helpText : '')));
      $el.attr('data-fieldgroup', aField.name);
      self.$el = $el;

      //mejoramos los componentes
      switch(aField.type) {
        case 'list':
          $formControl.find('input').select2({query: function(query){
            $.ajax(aField.catalog.url, {
              timeout:180000
            }).then(function(response) {
              var data = {results: []};
              $.each(response, function(i, item) {
                if(query.term.length == 0 || this.text.toUpperCase().indexOf(query.term.toUpperCase()) >= 0 ){
                  data.results.push({id: item[aField.catalog.id], text: item[aField.catalog.text] });
                }
              });     
              query.callback(data);             
            })
          }});
          break;
      }

      if(aField.type == 'hidden' || aField.type == 'sucursalPadre') {
        self.$el.hide();
      }
	  if(aField.type == 'map' && aValue)
	  {
		aValue = aValue.split(',');
		var place = new google.maps.LatLng(aValue[0],aValue[1]);
		var marker = new google.maps.Marker({
		position: place
		, map: map
		, });
		map.setCenter(place);
	  }else
	  {
		!aValue || $input.value(aValue);
	  }
		
      
      
      return self.$el;
    },
	loadMap: function(aValue,aField)
	{
		debugger;
		var markersArray = [];
			var mapOptions = {
			  center: new google.maps.LatLng(22.216035, -97.857869),
			  zoom: 10,
			  mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map($input2[0],mapOptions);
			google.maps.event.addListener(map, 'click', function(event) {
				var marker = new google.maps.Marker({
				position: event.latLng});
				if(markersArray.length>0)
				{
					markersArray[0].setMap(null);
					markersArray.length = 0;
				}
				marker.setMap(map);
				markersArray.push(marker);
				map.setCenter(event.latLng);
				value = event.latLng.toString();
				value = value.substring(1, value.length-1);
				aValue = value;
				$('[name="'+ aField.name+'"]').value(aValue);
				
			});
	}
    
  });
  return FieldView;
});
