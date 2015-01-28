var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
  'webpack-dev-server/client?http://0.0.0.0:3000',
  'webpack/hot/only-dev-server',
  './src/components/index.react'
  ],
  output: {
    path: __dirname,
    filename: './src/bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.json']
  },
  module: {
    loaders: [
    { test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', '6to5-loader'] }
    ]
  }
};
