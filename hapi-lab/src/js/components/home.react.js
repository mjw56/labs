import * as React from 'react';
import request from '../utils/request';

export default React.createClass({

  statics: {
    fetchData (params) {
      return request('http://localhost:3001/').then((res) => res.message);
    }
  },

  render() {
    return (
      <div>
        <p>{this.props.data.home}</p>
      </div>
    );
  }

});
