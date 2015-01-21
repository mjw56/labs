import Hapi from 'hapi';
import fs from 'fs';
import * as React from 'react';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config';
import Index from './src/js/components/index.react';
import * as Router from 'react-router';
import Routes from './src/js/utils/routes';
import FetchData from './src/js/utils/fetch-data';

let { DefaultRoute, Route, RouteHandler } = Router;

// Create a server with a host and port
let server = new Hapi.Server({
  connections: {
    routes: {
      cors: true
    }
  }
});

server.connection({
  host: 'localhost',
  port: 3001
});

server.route([
  {
    method: 'GET',
    path:'/',
    handler: function (request, reply) {
      reply({ message: "hapi data" });
    }
  },
  {
    method: 'GET',
    path:'/about',
    handler: function (request, reply) {
      reply({ message: "about data" });
    }
  }
]);

// Start the server
server.start();

let props = {
  data: {
    home: 'hapi server data',
    about: 'about server data'
  }
};

Router.run(Routes, '/',  function (Handler, state) {
  FetchData(state.routes, state.params).then((data) => {
    fs.writeFileSync('index.html', React.renderToString(React.createElement(Handler, { data: data })));
  });
});

let webpackSrv = new WebpackDevServer(webpack(config), {
  contentBase: './',
  publicPath: config.output.publicPath,
  hot: true
});

webpackSrv.use('/', function(req, res) {
  Router.run(Routes, req.path,  function (Handler, state) {
    FetchData(state.routes, state.params).then((data) => {
      res.send(React.renderToString(React.createElement(Handler, { data: data })));
    });
  });
});

webpackSrv.listen(3000, '0.0.0.0', (err, result) => {

  if (err) {
    console.log(err);
  }

  console.log('Listening at 0.0.0.0:3000');
});
