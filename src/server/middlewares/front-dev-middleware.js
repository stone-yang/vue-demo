import opn from 'opn';
import path from 'path';
import webpack from 'webpack';
import koaWebpackMiddleware from 'koa-webpack-middleware';
import koaWebpackDevMiddleware from 'koa-webpack-dev-middleware';
import convert from 'koa-convert';
import config from '@global/config';

// require('./check-versions')()

const webpackConfig = config.app.env === 'testing'
  ? require('../../../build/webpack.prod.conf')
  : require('../../../build/webpack.dev.conf');

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.app.port;
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser;
let bOpened = false;

const compiler = webpack(webpackConfig);

const devMiddleware = koaWebpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
  stats: {
    cached: false,
    cachedAssets: false,
    colors: true,
    exclude: ['node_modules'],
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
  },
});

const hotMiddleware = koaWebpackMiddleware.hotMiddleware(compiler, {
  log: () => {},
});
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

export default function (app) {
  // handle fallback for HTML5 history API
  // app.use(require('connect-history-api-fallback')())

  // serve webpack bundle output
  app.use(convert(devMiddleware));

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware);

  const uri = `http://localhost:${port}`;

  let devResolve = null;
  const readyPromise = new Promise((resolve) => {
    devResolve = resolve;
  });

  console.log('> Starting dev server...');
  devMiddleware.waitUntilValid(() => {
    console.log('> Dev server is ready.\n');
    // when env is testing, don't need open it
    if (autoOpenBrowser && !bOpened && config.app.env !== 'testing') {
      opn(uri);
      bOpened = true;
    }
    devResolve();
  });
  return readyPromise;
}
