import webpack from 'webpack';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import clientConfigGenerator from '../../../webpack/webpack.client.config';

const webpackConfig = clientConfigGenerator({ debug: true });
const compiler = webpack(webpackConfig);

const devMiddleware = webpackDevMiddleware(compiler, {
  noInfo: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
  },
  stats: {
    cached: false,
    cachedAssets: false,
    colors: true,
    exclude: ['node_modules'],
  },
  publicPath: webpackConfig.output.publicPath,
});

function* hotMiddleware(next) {
  yield webpackHotMiddleware(compiler).bind(null, this.req, this.res);
  yield next;
}

function frontDevMiddleware(app) {
  app.use(devMiddleware);
  app.use(hotMiddleware);
}

export default frontDevMiddleware;
