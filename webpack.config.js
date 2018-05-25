var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: {
    index: path.resolve(SRC_DIR, 'index.jsx'),
    register: path.resolve(SRC_DIR, 'register.jsx'),
    login: path.resolve(SRC_DIR, 'login.jsx'),
  },
  output: {
    filename: '[name].bundle.js',
    path: DIST_DIR
  },
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',      
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};