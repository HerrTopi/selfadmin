var webpack = require("webpack");

module.exports = {
  devtool: "inline-source-map",
  entry: ["webpack-hot-middleware/client", "./client/client.js"],
  output: {
    path: require("path").resolve("./public/js/"),
    filename: "bundle.js",
    publicPath: "/js/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          babelrc: false,
          presets: ["react", "react-hmre"],
          plugins: []
        }
      }
    ]
  }
};
