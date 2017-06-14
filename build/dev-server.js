require('./check-versions')()

var config = require('../config')
var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var koaWebpackMiddleware = require('koa-webpack-middleware')
var serve = require('koa-static-cache');
var convert = require('koa-convert');
var webpackConfig = config.app.env === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.app.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
var bOpened = false;

// var app = express()
var compiler = webpack(webpackConfig)

var expressDevMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})
var devMiddleware = async (ctx, next) => {
  await expressDevMiddleware(ctx.req, {
    end: (content) => {
      ctx.body = content
    },
    setHeader: (name, value) => {
      ctx.set(name, value)
    }
  }, next)
}
devMiddleware.waitUntilValid = expressDevMiddleware.waitUntilValid

var hotMiddleware = koaWebpackMiddleware.hotMiddleware(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

export default function (app) {
  // handle fallback for HTML5 history API
  // app.use(require('connect-history-api-fallback')())

  // serve webpack bundle output
  app.use(devMiddleware)

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware)

  // serve pure static assets
  var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
  app.use(convert(serve('./static', { prefix: staticPath }, {})));

  var uri = 'http://localhost:' + port

  var _resolve
  var readyPromise = new Promise(resolve => {
    _resolve = resolve
  })

  console.log('> Starting dev server...')
  devMiddleware.waitUntilValid(() => {
    console.log('> Dev server is ready.\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && !bOpened && config.app.env !== 'testing') {
      opn(uri)
      bOpened = true
    }
    _resolve()
  })
  return readyPromise;
}
