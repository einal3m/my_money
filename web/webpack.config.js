var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./src/js/my-money.js",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel"},
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader") }
    ]
  },
  devServer: {
    colors: true,
    port: 8090,
    hot: true
  },
  plugins: [
    new ExtractTextPlugin("public/bundle.css")
  ],
  resolve: {
    modulesDirectories: ['./node_modules']
  }
}