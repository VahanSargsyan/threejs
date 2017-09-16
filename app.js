var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.sendFile('/Users/Administrator/Desktop/threejs/index.html');
});

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});
