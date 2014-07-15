define([
  'lodash',
  'backbone'
], function(_, Backbone) {
  var ofertaModel = Backbone.Model.extend({
    name: 'Oferta',
    urlRoot: 'oferta',
    fields: [
	 {
        name: 'id_cliente',
        type: 'sucursalPadre',
        label: 'Id Cliente',
        rules: {
          required: true
        }
      },
      {
        name: 'descripcion',
        type: 'text',
        label: 'Descripcion',
        rules: {
          required: true
        }
      },
      {
        name: 'vigencia_app',
        type: 'text',
        label: 'Desde',
        rules: {
          required: true
        },
      },
	  {
        name: 'vigencia_cer',
        type: 'text',
        label: 'Hasta',
        rules: {
          required: true
        },
      },
	  {
		  name: 'imagportada',
		  type: 'file',
		  label: 'Imagen Portada',
		  rules: {
			required: true
		  },
	  },
	  {
	  name: 'imagofer',
	  type: 'file',
	  label: 'Imagenes de la oferta',
	  rules: {
	    required: true
	  }
  },
    ],
    defaults: {
	  id_cliente: '',
      descripcion: '',
      vigencia_app: '',
      vigencia_cer: '',
      imagportada: '',
      imagofer: ''
	  
    },
    initialize: function(){
    }
  });
  return ofertaModel;
});
