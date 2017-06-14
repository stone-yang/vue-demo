import Koa from 'koa';
import Router from 'koa-router';
import 'babel-polyfill';

/**
 * Config import
 */
import globalConfig from '../../config';
import koaConfig from './middlewares/koa';
// import mongoConfig from './db/mongo';
// import routeConfig from './middlewares/routes';

/**
 * Server
 */
const app = new Koa();
const router = Router();

if (globalConfig.app.env === 'development') {
  const frontDevMiddlewareConfig = require('./middlewares/front-dev-middleware').default;
  frontDevMiddlewareConfig(app);
}
koaConfig(app);

app
  // routes
  .use(router.routes())
  // Allowed methods
  .use(router.allowedMethods());

/**
 * Routes
 */
router.get('/', async (ctx, next) => {
  return ctx.render('index');
});
router.get('/100', async (ctx, next) => {
  ctx.body = { hello: 'world1000000' };
});

// routeConfig(app);

/**
 * Start Server - for production
 */
if (globalConfig.app.env === 'production') {
  app.listen(globalConfig.app.port, () => {
    console.log(`Server started, listening on port: ${globalConfig.app.port}`);
    console.log(`Environment: ${globalConfig.app.env}`);
  });
}

export default app;
