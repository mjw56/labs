import * as React from 'react';
import * as Router from 'react-router';
import Index from '../components/index.react';
import Home from '../components/home.react';
import About from '../components/about.react';

let { DefaultRoute, Route, RouteHandler, NotFoundRoute } = Router;

export default (
  <Route name="index" path="/" handler={Index}>
    <DefaultRoute name="home" handler={Home}/>
    <Route name="about" handler={About}/>
  </Route>
);
