require('./check-versions')()

var fs = require('fs')
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var utils = require('./utils')
var webpackConfig = require('./webpack.prod.conf')
var webpackServerConfig = require('./webpack.server.conf')

/**
 * client build task
 */
function runClientTask() {
  var cSpinner = ora('building client packages for production...')
  cSpinner.start()
  var _resolve
  var clientBuildPromise = new Promise(resolve => {
    _resolve = resolve
  });
  rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfig, function (err, stats) {
      cSpinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      // build complete
      _resolve()
    })
  })
  return clientBuildPromise;
}

/**
 * server build task
 */
function runServerTask() {
  var sSpinner = ora('building server packages for production...')
  sSpinner.start()
  webpack(webpackServerConfig, function (err, stats) {
    sSpinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
  })
}

utils.clearDir(config.build.assetsRoot)
runClientTask().then(res => runServerTask())


