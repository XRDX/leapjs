var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'lleg.min.js',
    path: __dirname
  },
  module: {
    noParse: [/clone/],
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};