/*eslint-disable*/

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

// http://jlongster.com/Backend-Apps-with-Webpack--Part-I
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  target: 'node',
  cache: true,
  context: __dirname,
  debug: true,
  devtools: "source-map",
  entry:   ["./js/server/server.js"],

  output:  {
    path:     path.join(__dirname, "dist-server"),
    filename: "server.js"
  },

  externals: nodeModules, // http://jlongster.com/Backend-Apps-with-Webpack--Part-I

  plugins: [
    new webpack.DefinePlugin({__CLIENT__: false, __SERVER__: true}),
    new webpack.DefinePlugin({"global.GENTLY": false}),
    new webpack.DefinePlugin({ 'ENV.browser': false })
  ],

  module: {
    loaders: [
      {include: /\.json$/, loaders: ['json-loader']},
      {include: /\.js$/, loaders: ['babel-loader?stage=1&optional=runtime'],
        exclude: [/node_modules/, /bower_components/]}
    ]
  },

  resolve: {
    extensions: ["", ".json", ".jsx", ".js"],
    modulesDirectories: [
      "server", "node_modules"
    ]
  },

  node:    {
    __dirname: true,
    fs:        'empty'
  }

}
