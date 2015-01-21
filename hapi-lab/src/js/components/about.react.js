import * as React from 'react';
import request from '../utils/request';

export default React.createClass({

  statics: {
    fetchData (params) {
      return request('http://localhost:3001/about').then((res) => res.message);
    }
  },

  render() {
    return (
      <div>
        <p>About</p>
        {this.props.data.about}
      </div>
    );
  }

});
