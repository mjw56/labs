import * as React from 'react';
import * as Router from 'react-router';
import Routes from './utils/routes';
import FetchData from './utils/fetch-data';

let { DefaultRoute, Route, RouteHandler } = Router;

Router.run(Routes, function(Handler, state) {
  FetchData(state.routes, state.params).then((data) => {
    React.render(<Handler data={data}/>, document)
  });
});
