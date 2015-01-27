import * as React from 'react';
import Header from './header.react';
import { RouteHandler } from 'react-router';

export default React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css" />
          <title>Isomorphic Lab</title>
        </head>
        <body>
          <Header />

          <RouteHandler />

          <script src="bundle.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
        </body>
      </html>
    )
  }
});
