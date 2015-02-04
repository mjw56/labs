/// <reference path='../../typings/react/react.d.ts' />

import React = require('react');

class HelloMessage extends React.Component {

  render() {
    return React.createElement('div', { className: this.props.name }, 'Hello ' + this.props.name);
  }

};


React.render(React.createElement(HelloMessage, { name: 'Mike' }), document.body);
