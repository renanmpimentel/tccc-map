var request = require('request'),
    cheerio = require('cheerio'),
    app     = require('express')();

const URL = 'http://src.tccc.com.br/PontosDeRecarga.htm';

app.get('/', function(req, res) {
  request(URL, function (err, resp, body) {
    if (!err) {
        var $ = cheerio.load(body);
        var info = [];

        $('tr').map(function (i, links) {
            var text = $(links).prev();

            info.push({
              address: text.find('td').eq(3).text(),
              district: text.find('td').eq(1).text(),
              local: text.find('td').eq(2).text(),
              city: text.find('td').eq(0).text()
            })
        });

    }
    res.json(info);
  });
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
