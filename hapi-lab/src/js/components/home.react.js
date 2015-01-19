import * as React from 'react';
import request from '../utils/request';

export default React.createClass({

  render() {
    return (
      <div>
        <p>{this.props.data.app}</p>
      </div>
    );
  }

});
