/*
 *  jQuery Handlebars - v1.0
 *  Plugin jQuery to Handlebars.
 *  https://github.com/italoqueiroz/jHandlebars
 *
 *  Made by Ítalo Queiroz
 *  Under MIT License
 */
(function() {
  (function($, window, document) {
    $.fn.handlebars = function(options) {
      var expression, regex;
      options = $.extend({}, $.fn.handlebars.options.defaults, options);
      expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      regex = new RegExp(expression);
      options.validateUrl = regex;
      return this.each(function() {
        var elem;
        elem = $(this);
        return $.fn.handlebars.options.init(elem, options);
      });
    };
    $.fn.handlebars.options = {
      defaults: {
        json: {},
        template: ""
      },
      init: function(elem, options) {
        var dataJson, templateHandleBars, templateHtml;
        templateHandleBars = this._loadTemplate(options);
        dataJson = this._loadJson(options);
        if (jQuery.isFunction(templateHandleBars)) {
          templateHtml = templateHandleBars(dataJson);
          return elem.html(templateHtml);
        } else {
          return elem.html('Ocorreu um erro no template handleBars, verifique o caminho informado.');
        }
      },
      _loadTemplate: function(options) {
        var template;
        if (options.template.match(options.validateUrl)) {
          template = this._ajax(options.template, 'html');
        } else {
          template = options.template;
        }
        if (jQuery.type(template) === 'string') {
          return Handlebars.compile(template);
        }
        return '';
      },
      _loadJson: function(options) {
        if (jQuery.isPlainObject(options.json)) {
          return options.json;
        } else if (jQuery.type(options.json) === 'string' && options.json.match(options.validateUrl)) {
          return this._ajax(options.json, 'json');
        }
        return {};
      },
      _ajax: function(url, dataType) {
        var dataReturn;
        dataReturn = null;
        $.ajax({
          url: url,
          dataType: dataType,
          async: false,
          success: function(data) {
            if (data) {
              return dataReturn = data;
            }
          }
        });
        return dataReturn;
      }
    };
  })(jQuery, window, document);

}).call(this);
