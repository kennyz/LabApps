var express =require('express'),
    app = express.createServer();

// bootstrap routing
require('./../config/routes').apply(app, express);

// bootstrap settings
require('./../config/environment').apply(app, express);

// start server - hardocded port for now
app.listen(80)
