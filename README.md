jHandlebars
================

Este é um plugin jQuery para auxiliar o uso do handlebars. Sendo que seu foco é agilizar o trabalho e a implementação dos frontends.


Iniciar:
------------
Para utilizar o plugin corretamente você deve importar as libs da jQuery e Handlebars.

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.1.2/handlebars.min.js"></script>
<script type="text/javascript" src="jquery.jhandlebars.js"></script>
```

Demo:
------------
* Exemplo 1:

```javascript
$(document).ready(function(){
    $("#element").handlebars({
      json: 'http://yourLocation.com.br/data.json', 
      template:'<div class="entry"><h1>jHandlebars</h1><div class="body">{{title}}</div></div>'
    });
});
```


* Exemplo 2:

```javascript
$(document).ready(function(){
    $("#element").handlebars({
      json:{title:'Second Template'},
      template:'http://yourLocation.com.br/template.html'
    });
});
```


* Exemplo 3:

```javascript
$(document).ready(function(){
    $("#element").handlebars({
      json:'http://yourLocation.com.br/data.json',
      template:'http://yourLocation.com.br/template.html'
    });
});
```


* Exemplo 4:

```javascript
$(document).ready(function(){
    $("#element").handlebars({
      json: {title:'Second Template'},
      template:'<div class="entry"><h1>jHandlebars</h1><div class="body">{{title}}</div></div>'
    });
});
```

Licença:
--------
Este projeto está sobre a [MIT license](http://italoqueiroz.mit-license.org/ "MIT License")

