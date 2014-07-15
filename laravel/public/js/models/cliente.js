define([
  'lodash',
  'backbone'
], function(_, Backbone) {
  var clientesModel = Backbone.Model.extend({
    name: 'Cliente',
    urlRoot: 'cliente',
    fields: [
      {
        name: 'nombre',
        type: 'text',
        label: 'Nombre',
        rules: {
          required: true
        }
      },
      {
        name: 'mail',
        type: 'text',
        label: 'Correo',
        rules: {
          required: true
        }
      },
      {
        name: 'telefono',
        type: 'text',
        label: 'Telefono',
        rules: {
          required: true
        },
      },
	  {
        name: 'tipo',
        type: 'single_choice',
        label: 'Tipo',
        rules: {
          required: true
        },
        answers:[
		{value:'0', text:'Restaurantes'},
		{value:'1', text:'Comida Rapida'},
		{value:'2', text:'Salud'},
		{value:'3', text:'Autos y Motos'},
		{value:'4', text:'Profesionistas'},
		{value:'5', text:'Todo para eventos'},
		{value:'6', text:'Oficios'},
		{value:'7', text:'Turismo'},
		{value:'8', text:'Entretenimiento'},
		{value:'9', text:'Supermercados'},
		{value:'10', text:'Electronicos'},
		{value:'11', text:'Boutiques'},
		{value:'12', text:'Belleza'},
		{value:'13', text:'Repostería'}
		],
        defaultValue: 'Restaurantes'
      },
	  {
        name: 'resena',
        type: 'text',
        label: 'Reseña',
        rules: {
          required: true
        },
      },
	  {
        name: 'horario_apert',
        type: 'time',
        label: 'Horario de apertura',
        rules: {
          required: true
        },
      },
	  {
        name: 'horario_cierre',
        type: 'time',
        label: 'Horario de cierre',
        rules: {
          required: true
        },
      },
	  {
        name: 'logo',
        type: 'file',
        label: 'Logo',
        rules: {
          required: true
        },
      },
	  {
        name: 'eslogan',
        type: 'text',
        label: 'Eslogan',
        rules: {
          required: true
        },
      },
	  {
        name: 'cont_nombre',
        type: 'text',
        label: 'Nombre del contacto',
        rules: {
          required: true
        },
      },
	  {
        name: 'cont_tel',
        type: 'text',
        label: 'Telefono del contacto',
        rules: {
          required: true
        },
      },
	  {
        name: 'cont_mail',
        type: 'text',
        label: 'Correo del contacto',
        rules: {
          required: true
        },
      },
	  {
        name: 'direccion',
        type: 'text',
        label: 'Direccion matriz',
        rules: {
          required: true
        },
      }
    ],
    defaults: {
      nombre: '',
      description: '',
      mail: '',
      telefono: '',
      tipo: '',
      resena: '',
      horario_apert: '',
      horario_cierre: '',
      logo: '',
      eslogan: '',
      cont_nombre: '',
      cont_tel: '',
      cont_mail: '',
	  direccion: ''
    },
    initialize: function(){
    }
  });
  return clientesModel;
});
