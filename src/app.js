const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
//var redirectToHTTPS  = require('express-http-to-https').redirectToHTTPS;
const port = process.env.PORT || 3001;
//app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));
require('./db/connection');
const Middleware = require('./Middelware/auth');
const route = require('./router/router');
app.use('/uploads', express.static(path.join(__dirname,'../uploads/')));
//app.use(express.static(path.join(__dirname,'../uploads/')));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // req.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(cors());
app.use(express.json());
app.use(Middleware);
app.use(route);

app.listen(port, () => { console.log('port no sucess' + port) })   