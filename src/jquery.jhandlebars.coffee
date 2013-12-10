(($, window, document) ->
  $.fn.handlebars = (options) ->
    options = $.extend({}, $.fn.handlebars.options.defaults, options)
    expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    regex = new RegExp expression
    options.validateUrl = regex
    @each ->
      elem = $(@)
      $.fn.handlebars.options.init(elem, options);


  $.fn.handlebars.options =
    defaults:
      json: {}
      template: ""
    init: (elem, options) ->
#      if !templateHandleBars && !jQuery.isFunction templateHandleBars
      templateHandleBars = @._loadTemplate options

#      if !dataJson || jQuery.isEmptyObject dataJson
      dataJson = @._loadJson options

      if jQuery.isFunction templateHandleBars
        templateHtml = templateHandleBars(dataJson)
        elem.html(templateHtml)
      else
        elem.html('Ocorreu um erro no template handleBars, verifique o caminho informado.');

    _loadTemplate: (options) ->
      if options.template.match options.validateUrl
        template = @._ajax options.template, 'html'
      else
        template = options.template

      if jQuery.type(template) == 'string'
        return Handlebars.compile(template)
      ''
    _loadJson: (options) ->
      if jQuery.isPlainObject options.json
        return options.json
      else if jQuery.type(options.json) == 'string' and options.json.match options.validateUrl
        return this._ajax options.json, 'json'
      {}
    _ajax: (url, dataType) ->
      dataReturn = null
      $.ajax
        url: url,
        dataType: dataType,
        async: false,
        success: (data)->
          if data
            dataReturn = data

      dataReturn

  return
) jQuery, window, document