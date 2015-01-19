import * as React from 'react';
import * as Router from 'react-router';
import Header from './components/header.react';
import Home from './components/home.react';
import About from './components/about.react';
import EventEmitter from 'eventemitter3';
import request from './utils/request';

let { DefaultRoute, Route, RouteHandler } = Router,
    API = 'http://localhost',
    loadingEvents = new EventEmitter(),

App = React.createClass({

  statics: {
    fetchData (params) {
      return request('http://localhost:3001/hapi').then((res) => res.message);
    }
  },

  render() {
    return (
      <div className="container">
        <Header />

        <RouteHandler {...this.props} />
      </div>
    );
  }

});

let routes = <Route name="app" path="/" handler={App}>
  <DefaultRoute name="home" handler={Home}/>
  <Route name="about" handler={About}/>
</Route>

function fetchData(routes, params) {
  let data = {};

  return Promise.all(routes
    .filter(route => route.handler.fetchData)
    .map(route => {
      return route.handler.fetchData(params).then(d => {data[route.name] = d;});
    })
  ).then(() => data);
}

Router.run(routes, function(Handler, state) {
  fetchData(state.routes, state.params).then((data) => {
    React.render(<Handler data={data} />, document.body)
  });
});
