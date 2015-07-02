var webpack = require('webpack'),
    path = require('path');

module.exports = {
  devtool: 'source-map',

  entry: {
    'app': './js/main.js',
    'vendor': './js/vendor.js',
  },

  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader'},
      { test: /\.js$/, exclude: /node_modules\//, loader: 'babel-loader'},
    ],
  },

  resolve: {
    root: path.join(__dirname, 'js'),
    extensions: ['', '.js', '.json'],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
};
