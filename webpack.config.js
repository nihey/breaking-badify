var webpack = require('webpack'),
    path = require('path');

module.exports = {
  devtool: 'source-map',

  entry: {
    'app': './js/main.js',
    'vendor': './js/vendor.js',
  },

  resolve: {
    root: path.join(__dirname, 'js'),
    extensions: ['', '.js'],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
};
