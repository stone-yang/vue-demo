import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import path from 'path';
import serve from 'koa-static-cache';
import views from 'koa-views';
import convert from 'koa-convert';

import config from '../../../config';

const STATIC_FILES_MAP = {};
const SERVE_OPTIONS = { prefix: '/assets/', maxAge: 365 * 24 * 60 * 60 };

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
   * Counting time
   */
  // app.use(async (ctx, next) => {
  //   const start = Date.now();
  //   await next();
  //   console.log(`[${ctx.request.method}][${ctx.request.url}] ${Date.now() - start} ms.`);
  // });

  /**
   * Serve pure static assets
   * Config templates rendering
   */
  if (config.app.env === 'production') {
    const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
    app.use(convert(serve(path.resolve(process.cwd(), 'dist', 'static'), { prefix: staticPath }, {})));
    app.use(views(path.resolve(process.cwd(), 'dist')));
  }

  /**
   * Body parser
   */
  app.use(bodyParser());
}
