var webpack = require("webpack");

module.exports = {
  devtool: "sourcemap",
  entry: ["./client/client.js"],
  output: {
    path: require("path").resolve("./public/js/"),
    filename: "bundle.js",
    publicPath: "/"
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(false),
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      beautify: false,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      },
      mangle: true,
      keep_fnames: true,
      comments: false,
      sourceMap: false
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          babelrc: false,
          presets: ["react", "es2015"]
        }
      }
    ]
  }
};
