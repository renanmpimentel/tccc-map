var express = require('express')
  , jsdom = require('jsdom')
  , request = require('request')
  , url = require('url')
  , app = express();

var uri = 'http://src.tccc.com.br/PontosDeRecarga.htm';


app.get('/', function(req, res) {
  request({uri: uri}, function(err, response, body){
    var self = this;
    self.items = new Array();

    if (err && res.statusCode !== 200) { console.log('Resquest Error.');};

    jsdom.env({
      html: body,
      scripts: ['http://code.jquery.com/jquery-1.6.min.js'],
      done: function(err, window){
        var $ = window.jQuery
          , $body = $('body')
          , $table = $('table')
          , $tr = $body.find('table tr');

          $tr.each(function(i, item){

            var $td = $(item).find('td');

            $td.each(function(j, result){

              if (j < 5) {

              };
              console.log(j + ' - ' + $td.eq(j).text());
            })
          })
      }
    })
  })
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;

var env = app.get('env') == 'development' ? 'dev' : app.get('env');
var port = process.env.PORT || 8000;

app.listen(port);
console.log('Magic happens on port ' + port);