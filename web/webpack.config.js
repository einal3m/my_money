const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/js/my-money.js',
    vendor: [
      'accounting',
      'd3',
      'immutable',
      'moment',
      'react',
      'react-bootstrap',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-bootstrap',
      'react-stickydiv',
      'redux',
      'reselect',
      'validate.js',
    ],
  },
  output: {
    filename: '../public/bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['es2015', 'react', 'stage-0'] } },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader') },
      { test: /\.gif$/, loader: 'url-loader?limit=8192' },
    ],
  },
  devServer: {
    colors: true,
    port: 8090,
    hot: true,
  },
  plugins: [
    new ExtractTextPlugin('../public/bundle.css'),
    new CommonsChunkPlugin('vendor', '../public/vendor.bundle.js'),
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
  ],
  resolve: {
    modulesDirectories: ['./node_modules'],
  },
};
