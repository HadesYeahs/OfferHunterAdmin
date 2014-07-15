define([
  'lodash',
  'backbone'
], function(_, Backbone) {
  var sucursalModel = Backbone.Model.extend({
    name: 'Sucursal',
    urlRoot: 'sucursal',
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
        name: 'nombre',
        type: 'text',
        label: 'Nombre',
        rules: {
          required: true
        }
      },
      {
        name: 'direccion',
        type: 'text',
        label: 'Direccion',
        rules: {
          required: true
        },
      },
	  {
        name: 'ubicacion',
        type: 'map',
        label: 'Ubicacion',
        rules: {
          required: true
        },
      },
    ],
    defaults: {
	  id_cliente: '',
      nombre: '',
      direccion: '',
      ubicacion: ''
    },
    initialize: function(){
    }
  });
  return sucursalModel;
});
