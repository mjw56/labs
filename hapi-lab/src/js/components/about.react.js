import * as React from 'react';

export default React.createClass({

  statics: {
    fetchData (params) {
      return request('http://localhost:3001/about').then((res) => res.message);
    }
  },

  render() {
    return (
      <div>
        { !this.props.data.about ? 'Loading...' : <p>{this.props.data.about}</p>}
      </div>
    );
  }

});
