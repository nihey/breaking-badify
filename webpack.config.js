var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlPlugin = require('./plugins/html-plugin'),
    path = require('path');

module.exports = {
  entry: {
    'script': './scripts/main.js',
    'style': './styles/badify.less',
  },

  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader'},
      { test: /\.js$/, exclude: /(node_modules|bower_components)\//, loader: 'babel-loader'},
      { test: /\.(ttf.*|eot.*|woff.*|ogg|mp3)$/, loader: 'file-loader'},
      { test: /.(png|jpe?g|gif|svg.*)$/, loader: 'file-loader!img-loader?optimizationLevel=7&progressive=true'},
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new HtmlPlugin('index.html'),
    new webpack.DefinePlugin({
      Environment: JSON.stringify(require('config')),
    }),
  ],

  resolve: {
    root: path.join(__dirname, 'scripts'),
    extensions: ['', '.js', '.json'],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
};
