var request = require('request'),
    cheerio = require('cheerio'),
    app     = require('express')();

const URL = 'http://src.tccc.com.br/PontosDeRecarga.htm';

app.get('/', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  request(URL, function (err, resp, body) {
    if (!err) {
        var $ = cheerio.load(body);
        var info = [];

        $('table tr').map(function (i, links) {
            var text = $(links).prev();

            // the content init in line 2
            if (i > 1) {
              info.push({
                address: text.find('td').eq(3).text() + ' - ' + text.find('td').eq(1).text() + ', ' + text.find('td').eq(0).text() + '- Paraná',
                phone: text.find('td').eq(4).text(),
                link: text.find('td').eq(5).find('a').attr('href'),
                local: text.find('td').eq(2).text()
              })
            };
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