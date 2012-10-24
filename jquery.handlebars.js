;(function ( $, window, undefined ) {
  // Nome do plugin => 'handlebars';
  var pluginName = 'handlebars',
    document = window.document,
    dataJson = null,
    templateHandleBars = null,
    defaults = {
      json: {},
      template: ''
    };

  // Construtor do nosso Plugin;
  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }
  
  Plugin.prototype = {
    //Método init();
    init: function () {
      this.refresh();
    },
    //Método refresh() que cuida de instanciar o template e o json;
    //Depois monta e compila os dados para retornar o html gerado;
    refresh: function () {
      //Verifica se o template já foi instanciado e se é uma função;
      if (!templateHandleBars && !jQuery.isFunction(templateHandleBars)) {
        templateHandleBars = this._loadTemplate();
      }
      //Verifica se já está instanciado o json de dados;
      if (!dataJson || jQuery.isEmptyObject(dataJson)) {
        dataJson = this._loadJson();
      }
      //Só é possível montar o template se o "templateHandleBars" for uma função;
      if (jQuery.isFunction(templateHandleBars)) {
        var templateHtml = templateHandleBars(dataJson);
        $(this.element).html(templateHtml);
      } else {
        $(this.element).html('Ocorreu um erro no template handleBars, verifique o caminho informado.');
      }
      
    },
    //Método _loadTemplate() que carrega e instancia o template handlebars;
    _loadTemplate: function () {
      var template = this._ajax(this.options.template, 'html');
      if (jQuery.type(template) === 'string') {
        return Handlebars.compile(template);
      }
      return '';
    },
    //Método _loadJson() que carrega e instancia o json de dados;
    _loadJson: function () {
      //Se o json for um objeto ele não chama o AJAX;
      if (jQuery.isPlainObject(this.options.json)) {
        return this.options.json
      } else if (jQuery.type(this.options.json) === 'string') {
        return this._ajax(this.options.json, 'json');
      }
      return {};
    },
    //Método _ajax() responsável por realizar as requisições AJAX do plugin;
    _ajax: function (url, dataType) {
      var dataReturn = null;
      
      $.ajax({
        url: url,
        dataType: dataType,
        async: false,
        success: function (data) {
          if (data) {
            dataReturn = data;
          }
        }
      });
      
      return dataReturn;
    },
  };
  //Função que instancia nosso Plugin passando o element e os options informados;
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
      }
    });
  }

}(jQuery, window));