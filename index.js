var express = require('express');
var wagner = require('wagner-core');
var app = express();
require('./models')(wagner);
app.use('/api/v1',require('./api')(wagner));
app.listen(3000);
console.log('Listening on port 3000');