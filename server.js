var express = require('express'),
    path = require('path');
var app = express();

app.use(express.static('src'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + 'src/index.html'));
});

app.listen(8080);