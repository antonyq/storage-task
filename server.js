var http = require('http'),
    path = require('path'),
    express = require('express');

var app = express();

app.set('port', process.env.PORT || 8080);

app.use(express.static(path.join(__dirname, 'src')));

http.createServer(app).listen(app.get('port'), app.get('ip'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', function (request, response) {
    response.render('src/index');
    // response.sendFile(path.join(__dirname + '/src/index.html'));
});
