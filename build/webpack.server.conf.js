var path = require('path')
var fs = require('fs')
var utils = require('./utils')
var config = require('../config')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

function resolve (...dir) {
  return path.join(__dirname, '..', ...dir)
}

const nodeModules = {};
fs.readdirSync(config.build.nodeModulesPath)
  .filter( (x) => {
      return ['.bin'].indexOf(x) === -1;
  })
  .forEach( (mod) => {
      nodeModules[mod] = 'commonjs ' + mod;
  });

const webpackConfig = {
  entry: {
    server: 
      config.app.env === 'production' ?
      ['babel-polyfill',
      config.build.serverPath] :
      ['webpack/hot/poll?1000',
        'babel-polyfill',
        config.dev.serverPath],
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: config.app.env === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
    // The filename of non-entry chunks
    chunkFilename: config.app.debug ? '[name].chunk.js' : '[chunkhash:8].[name].chunk.min.js',
    // The filename of the SourceMaps for the JavaScript files.
    sourceMapFilename: "debugging/[file].map",
  },
  externals: nodeModules,
  target: 'node',
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@server': config.app.serverFilePath,
      '@models': config.app.modelsPath,
      '@global': config.app.globalPath,
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
    ]
  },
  plugins: [
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new FriendlyErrorsPlugin()
  ],
  node: {
		__filename: true,
		__dirname: true,
	},
  devtool: config.app.debug ? '#inline-source-map' : '#source-map',
}

// if (config.app.env === 'production') {
//   webpackConfig.plugins.push(
//     new webpack.optimize.UglifyJsPlugin({
//       compress: {
//         warnings: false
//       },
//       sourceMap: true
//     })
//   );
// }

module.exports = webpackConfig;
