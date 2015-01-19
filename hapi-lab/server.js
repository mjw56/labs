var Hapi = require('hapi');
import fs from 'fs';
import * as React from 'react';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config';
import Index from './src/js/components/index.react';

// Create a server with a host and port
var server = new Hapi.Server({
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
    path:'/hapi',
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

fs.writeFileSync('index.html', React.renderToString(React.createElement(Index, {
  title: 'Hapi Lab',
  children: 'Hello World!'
})));

new WebpackDevServer(webpack(config), {
  contentBase: './',
  publicPath: config.output.publicPath,
  hot: true
}).listen(3000, '0.0.0.0', (err, result) => {

  if (err) {
    console.log(err);
  }

  console.log('Listening at 0.0.0.0:3000');
});
