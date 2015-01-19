var React = require('react');

var Index = React.createClass({
  render() {
    var scripts = [
      <script key="1" src="http://localhost:3000/dist/bundle.js"></script>,
      <script key="2" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js"></script>
    ];

    var styles = [
      <link key="1" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" />,
      <link key="2" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css" />
    ];

    return (
      <html>
        <head>
          {styles}
          <title>{this.props.title}</title>
        </head>
        <body>
          {this.props.children}
          {scripts}
        </body>
      </html>
    );
  }
});

module.exports = Index;
