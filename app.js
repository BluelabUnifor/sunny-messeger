
var express = require('express'); // app server
var bodyParser = require('body-parser');

app = express();

app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json());

require('./rotas/conversation')(app);
require('./rotas/speech-to-text')(app);
require('./rotas/text-to-speech')(app);


module.exports = app;
