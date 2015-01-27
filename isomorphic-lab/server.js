import http from 'http';
import Router from 'react-router';
import React from 'react';
import routes from './src/utils/routes';

let express = require('express');
let app = express();

let Application = React.createFactory(require('./src/components/index.react'));

app.use(express.static(__dirname + '/'));

app.use(function(req, res, next) {
  Router.run(routes, req.url, function(Handler) {
    var Handler = React.createFactory(Handler);
    var html = React.renderToString( Handler() );
    res.send(html);
  });

});

app.listen(8080);
