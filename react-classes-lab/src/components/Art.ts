  /// <reference path='../../typings/react/react.d.ts' />

  import React = require('react');
  import webAPI = require('../utils/web-api');

  interface State {
    id: string
    posts: any;
  }

  interface Props {
    url: string;
  }

  class Art extends React.Component {

    state: State;

    constructor(props: Props) {
      super(props);

    this.state = { id: 'Art', posts: [] };
  }

  componentDidMount() {
    webAPI.getPosts(this.props.url)
      .then((posts) => {
          this.setState({ posts: webAPI.extractPosts(posts) })
      })
  }

  render() {

    var renderImages = () => {
      return this.state.posts.map((post, i) => {
        return React.createElement('img', { key: i, src: post });
      });
    }

    return React.createElement('div', null, renderImages());
  }

};

React.render(React.createElement(Art, { url: "http://www.reddit.com/r/art/top.json?sort=top&t=week" }),
 document.getElementById('component'));
