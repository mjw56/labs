import http from 'http';
import Router from 'react-router';
import React from 'react';
import routes from './src/utils/routes';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config';
import fs from 'fs';

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

Router.run(routes, '/',  function (Handler, state) {
  fs.writeFileSync('index.html', React.renderToString(React.createElement(Handler)));
});

let webpackSrv = new WebpackDevServer(webpack(config), {
  contentBase: './',
  publicPath: config.output.publicPath,
  hot: true
});

webpackSrv.use('/', function(req, res) {
  Router.run(routes, req.url, function(Handler) {
    var Handler = React.createFactory(Handler);
    var html = React.renderToString( Handler() );
    res.send(html);
  });
});

webpackSrv.listen(3000, '0.0.0.0', (err, result) => {

  if (err) {
    console.log(err);
  }

  console.log('Listening at 0.0.0.0:3000');
});
