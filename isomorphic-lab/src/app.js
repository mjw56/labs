import React from 'react';
import Index from './components/index.react';
import routes from './utils/routes';
import Router from 'react-router';

if(typeof window !== 'undefined') {
  Router.run(routes, Router.HistoryLocation, function(Handler) {
    var Handler = React.createFactory(Handler);
    React.render(Handler(), document);
  });
}
