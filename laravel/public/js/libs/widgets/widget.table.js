define(['jquery', 'libs/finderSelect/jquery.finderSelect.min'], function($){
  console.log('table')
  $.widget("ui.table", {
    options: {
      canAdd: true,
      canEdit: true,
      url: null,
      checkbox: true,
      columns:[],
      /** Tipo de vistas, inline, agrega el formulario abajo de la vista */
      type:'default',
      pagination: {
        'total':0,
        'per_page':15,
        'current_page':1,
        'last_page':0,
        'from':0,
        'to':0
      }
    },  
  
    _create: function() {  
      var self = this;

      self.element.append(
          self._createControlsHeader(),
          self._createTable(),
          self._createForm()
        );
      self._buildPage();
      
      self.tHead.find("input[type='checkbox']").change(function () {
        if ($(this).is(':checked')) {
          self.tBody.finderSelect('highlightAll');
        } else {
          self.tBody.finderSelect('unHighlightAll');
        }
      });

      if(self.options.collection) {
        self.options.collection.on('add', function(aModel) { 
          self._addRow(aModel.attributes);
          self._updateUI();
        })
        self.options.collection.on('change', function(aModel)  {
          if(aModel.previous('id') < 0 && aModel.id > 0) {
            self._addRow(aModel.attributes, aModel.previous('id'));
          } else {
            self._addRow(aModel.attributes);
          }
          self._updateUI();
        })
      }
    },

    _createControlsHeader: function() {
      var self = this, controls = $('<div/>', {'class':'controlsheader'}), btnNew, btnRemove, list = $('<ul/>');

      btnNew = $('<a/>', {'class': 'btn btn-primary btn-mini btn-new', href:self.options.btnNew}).html('New');
      btnRemove = $('<button/>', {'class': 'btn btn-primary btn-mini btn-trash'}).hide().html('Send Selected to Trash');
      console.debug(self.options.type)
      if(self.options.type != 'inline' && self.options.canAdd)
        list.append($('<li/>').append(btnNew));
      list.append($('<li/>').append(btnRemove));

      btnRemove.on('click', function(){self._removeAllSelected()});

      self.controlsHeader = controls.append(list);
      return controls;
    },

    _createTable: function() {
      this.tBody = this._createTableBody();
      return $('<table/>', {'class':'table table-condensed'}).append(this._createTableHeader(), this.tBody);
    },

    _createForm: function() {
      var self = this;
      if(self.options.type != 'inline')
        return null;

      $form = $('<div/>');
      var containerButton = $('<div/>', {'class':'containerButtonAdd'}).append(
        $('<button/>', {'class': 'btn btn-default btn-sm'}).html('Add...').on('click', function(){
          self._open();
        })
      );
      $form.append(
        containerButton
      );
      /*
      require(['views/forms/inlineForm', 'Vm'], function(BasicForm, Vm){
        var aModel = aModelEdit || new self.options.collection.model();
        var detailForm = Vm.create(appView, (aModelEdit ? 'editDetailForm' : 'detailForm'), BasicForm, {model:aModel, collection: self.options.collection});
        if(!aModelEdit) {
          var detailFormContainer = $('<div/>').append(detailForm.render()).hide();
          var containerButton = $('<div/>', {'class':'containerButtonAdd'}).append(
                  $('<button/>', {'class': 'btn btn-default btn-sm'}).html('Add ' + aModel.label).on('click', function(){
                    detailFormContainer.show();
                    containerButton.hide();
                  })
                );
          $form.append(
              containerButton,
              detailFormContainer
            );  
        } else {
          $form.append(detailForm.render());
          detailForm.hideButtons();
        }        
      })*/

      return $form;
    },

    _createTableHeader: function() {
      var tHead = $('<thead/>'), columns = this.options.columns, myTR = $('<tr/>');
      if(this.options.checkbox) {
        myTR.append($('<th/>', {'class':'checked'}).append($('<input/>', {type:'checkbox'})));
      }
      if(this.options.sortable) {
        myTR.append($('<th/>', {'class':'handle'}));
      }
      for(var i=0; i<columns.length; i++) {
        myTR.append($('<th/>').html(columns[i].label));
      }
      this.tHead = tHead;
      return tHead.append(myTR);
    },

    _createTableBody: function() {
      return $('<tbody/>');
    },

    _buildPage: function() {
      var self = this;
      if(self.options.url) {
        $.ajax({url:self.options.url, data:{}}).then(function(res){
          for(var i = 0; i<res.length; i++) {
            self._addRow(res[i]);
          }
          self._onAfterCreatePage();
        }, function(res) {

        });
      } else {
        if(self.options.data) {
          for(var i = 0; i<self.options.data.length; i++) {
            self._addRow(self.options.data[i]);
          }
        } else if (self.options.collection) {
          self.options.collection.forEach(function(aModel) {
            self._addRow(aModel.toJSON());
          })
        }
        self._onAfterCreatePage();
      }
    },
  
    _addRow: function(row, previusId) {
      var self = this, myTR = self.tBody.find('TR[data-id="'+ row.id +'"]'), columns = self.options.columns, myTD, bEdit = false, sValue;
      if(previusId) {
        myTR = self.tBody.find('TR[data-id="'+ previusId +'"]');
      }
      if(myTR.length == 0) {
        myTR = $("<tr/>");
      } else {
        myTR.empty();
        bEdit = true;
      }
      myTR.attr('id', 'item_' + row.id);
      myTR.data('id', row.id).attr('data-id', row.id);
      if(self.options.checkbox) {
        myTR.append('<td class="checked"><input type="checkbox" /></td>');
      }
      if(self.options.sortable) {
        myTR.append('<td class="handle"><i class="fa fa-sort"></i></td>'); 
      }
      for(var i = 0; i<columns.length; i++) {
        myTD = $('<td/>');
        sValue = row[columns[i].name];
        if($.isPlainObject(sValue)) {
          for(var key in sValue) break;
          sValue = sValue[key];
        }
        switch(columns[i].type) {
          case 'link':
            myTD.html($('<a/>', {href:sValue}).html(columns[i].label)).addClass('safezone link');
            break;
          default:
			if(columns[i].label == "Logo")
			{
				myTD.append($('<img/>', {'class':'imageLogo','src':"http://michellhdz.com/offerhunter/laravel/app/uploads/clilogo/"+sValue}));
			}
            myTD.append($('<span/>', {'class':'safezone ' + (self.options.canEdit ? 'open':'')}).html(sValue));
        }        
        myTR.append(myTD);
      }
      myTR.find(".safezone").on("click", function(e){
        return false;
      });
      myTR.find('.handle').on('mouseenter', function(e) {
         return false;
      })
      myTR.find('.safezone.open').on('click', function(e) {
		$(".modal").remove();
        self._open(row.id);
      })
      myTR.find('.safezone.link').on('click', function(e) {
        var sUrl = $(this).find('a').attr('href');
        if(sUrl)
          Backbone.history.navigate(sUrl, { trigger : true });
      })
      if(!bEdit)
        self.tBody.append(myTR);      
    },

    _open: function(id) {
      var self = this, aModel, bisEdit = false;

      if(!id) {
        aModel = new self.options.collection.model();
        aModel.set('sortableKey', self.options.collection.length);
      } else {
        aModel = self.options.collection.get(id);
        bisEdit = true;     
      }
     
      require(['views/modal/basicModal', 'views/forms/inlineForm', 'vm'], function(BasicModal, BasicForm, Vm){
        var detailForm = Vm.create(appView, (bisEdit ? 'editDetailForm' : 'detailForm'), BasicForm, {model:aModel, collection: (bisEdit ? null : self.options.collection)});
        var $form = detailForm.render()
        detailForm.hideButtons();
        var aModal = Vm.create(appView, 'modalseeee', BasicModal, {modalTitle: (bisEdit ? 'Edit...' : 'Add'),callback: function(){
          if(detailForm.submit()) {
            //$modal.modal('hide')/*.remove();
			$modal.modal('hide');
            //aModal.remove();*/
          } 
        }});
        var $modal = aModal.render();
		$modal.addClass("mapp");
        $modal.find('.modal-body').append($form);
        $('body').append($modal);
		$(".mapp").on('shown.bs.modal', function (e) {
				debugger;
			  google.maps.event.trigger($input2, 'resize');
		})
      })
    },

    _removeAllSelected: function() {
      var self = this;
      this.tBody.find("input[type='checkbox']:checked").parents('TR').each(function(i, element) {
        var aId = $(element).data('id'),
        aModel = self.options.collection.get(aId);
        self.options.collection.remove(aModel);
        aModel.destroy();
        $(element).remove();
      })
      if(this.tBody.find("input[type='checkbox']").length == 0) {
        this.controlsHeader.find('.btn-trash').hide();
        this.tHead.find("input[type='checkbox']").prop('checked', false);
      }
      this._updateUI();
    },

    _onAfterCreatePage: function() {
      this._updateUI();
    },

    _updateUI: function() {
      var self = this;
      if(this.tBody.find('tr').not('.nodata').length) {
        if (!this.tBody.hasClass('finderSelect')) {
          this.tBody.addClass('finderSelect');
          this.tBody.finderSelect({enableDesktopCtrlDefault:true, dragEvent:'', event:'click'});
          self.tBody.finderSelect('addHook','highlight:before', function(el) {
            el.find('input').prop('checked', true);
            !el.length || self.controlsHeader.find('.btn-trash').show();
          });
          self.tBody.finderSelect('addHook','unHighlight:before', function(el) {
            el.find('input').prop('checked', false);
            if(self.tBody.find("input[type='checkbox']:checked").length==0) {
              self.tHead.find("input[type='checkbox']").prop('checked', false);
              self.controlsHeader.find('.btn-trash').hide();
            }
          });
          self.tBody.on("click", ":checkbox", function(e){
            //e.preventDefault();
          });
        } else {
          this.tBody.finderSelect('update');
        }
        
        this.tBody.find('.nodata').remove();
        
        if(self.options.sortable) {
          self.tBody.sortable({ handle: ".handle .fa-sort", axis: "y", forceHelperSize: true, forcePlaceholderSize: true, opacity: 0.5, cursor: "move" });
          self.tBody.sortable({
            update: function( event, ui ) {
              var res = self.tBody.sortable( "toArray", { attribute: "data-id"/*, expression: /(.+)[_=-](.+)/*/ } )
              for(var i = 0; i < res.length; i++) {
                var aModel = self.options.collection.get(res[i]);
                if(aModel) {
                  aModel.set('sortableKey', i);
                }
              }               
            }
          });
        }
      } else {
        if(!this.tBody.find('.nodata').length)
          this.tBody.append('<tr class="nodata"><td colspan="'+ (this.options.columns.length + (this.options.checkbox ? 1 : 0)) +'">No se encontraron datos</td></tr>')
      }
    },
  
    myPublicFunction: function() {
    },
    destroy: function() {}  
  });
})