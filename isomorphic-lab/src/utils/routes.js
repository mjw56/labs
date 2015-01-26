import * as React from 'react';
import * as Router from 'react-router';
import Index from './components/index.react';
import Home from './components/home.react';

let { DefaultRoute, Route, RouteHandler } = Router;

var routes = (
  <Route handler={Index} path="/">
    <DefaultRoute name="home" handler={Home} />
  </Route>
);

module.exports = routes;
