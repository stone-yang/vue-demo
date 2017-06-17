import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import path from 'path';
import serve from 'koa-static-cache';
import views from 'koa-views';
import convert from 'koa-convert';

import config from '../../../config';

export default function (app) {
  /**
   * logger
   */
  if (config.app.env !== 'test') {
    app.use(logger());
  }
  /**
   * global error handler
   */
  app.use(async (ctx, next) => {
    try {
      await next();

      if (!ctx.status) {
        ctx.status = 200;
      }
    } catch (e) {
      ctx.status = 500;
      console.log('\n========================== System Error ==========================\n');
      console.log(e.stack);
      ctx.body = { error: e.message };
    }
  });

  /**
   * Serve pure static assets
   */
  const servePath = config.app.env === 'production'
    ? path.resolve(config.build.assetsRoot, config.build.assetsSubDirectory) : './static';
  const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
  app.use(convert(serve(servePath, { prefix: staticPath }, {})));

  /**
   * Config templates rendering
   */
  if (config.app.env === 'production') {
    app.use(views(config.build.assetsRoot));
  }

  /**
   * Body parser
   */
  app.use(bodyParser());
}
