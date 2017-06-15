import Koa from 'koa';
import Router from 'koa-router';
import 'babel-polyfill';
import mongoose from 'mongoose';

/**
 * Config import
 */
import globalConfig from '@global/config';
import koaConfig from './middlewares/koa';
import mongoConfig from './db/mongo';
import routeConfig from './middlewares/routes';

/**
 * Server
 */
const app = new Koa();
const router = Router();

/**
 * Client webpack-dev-server
 */
if (globalConfig.app.env === 'development') {
  const frontDevMiddlewareConfig = require('./middlewares/front-dev-middleware').default;
  frontDevMiddlewareConfig(app);
}
koaConfig(app);

/**
 * Routes
 */
routeConfig(app);

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
