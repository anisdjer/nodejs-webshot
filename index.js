var webshot = require('webshot');
var fs      = require('fs');
var express = require('express');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use("/screenshot", function (req, res) {

if (!req.query.url) { res.status(404).end();return};

	var renderStream = webshot(req.query.url);

res.writeHead(200, {'Content-Type': 'text/plain' });
	renderStream.on('data', function(chrunk) {
	  res.write(chrunk.toString('base64'), 'base64');
	});

renderStream.on('end', function () { res.end();});

});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
