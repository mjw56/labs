var Hapi = require('hapi');
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config';

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

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true
}).listen(3000, '0.0.0.0', (err, result) => {

  if (err) {
    console.log(err);
  }

  console.log('Listening at 0.0.0.0:3000');
});
