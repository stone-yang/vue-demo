import Koa from 'koa';
import http from 'http';

/**
 * Config import
 */
import globalConfig from '../../config';
import koaConfig from './middlewares/koa';
import mongoConfig from './db/mongo';
// import routeConfig from './middlewares/routes';

/**
 * Server
 */
const app = new Koa();
koaConfig(app);

/**
 * Routes
 */
// routeConfig(app);

/**
 * Start Server - for production
 */
if (globalConfig.app.env === 'production') {
  const server = http.createServer();
  server.on('request', app.callback());
  server.listen(globalConfig.app.port, () => {
    console.log(`Server started, listening on port: ${globalConfig.app.port}`);
    console.log(`Environment: ${globalConfig.app.env}`);
  });
}

export default app;
