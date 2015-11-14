module.exports = {
  entry: "./src/js/my-money.js",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel"}
    ]
  },
  devServer: {
    colors: true,
    port: 8090,
    hot: true
  },
};
