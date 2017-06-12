import koa from 'koa';
import bodyParser from 'koa-bodyparser';
// import logger from 'koa-logger';
import path from 'path';
// import serve from 'koa-static-cache';
import views from 'co-view';

import config from '../../../config';

const STATIC_FILES_MAP = {};
const SERVE_OPTIONS = { prefix: '/assets/', maxAge: 365 * 24 * 60 * 60 };

export default function (app) {
  // if (config.app.env !== 'test') {
  //   app.use(logger());
  // }
  /**
   * 全局错误处理
   */
  app.use(function* errorHandler(next) {
    try {
      yield next;

      if (!this.status) {
        this.status = 200;
      }
    } catch (e) {
      this.status = 500;
      console.log('\n========================== 系统错误 ==========================\n');
      console.log(e.stack);
      this.body = { error: e.message };
    }
  });

  // if (config.app.env === 'production') {
  //   app.use(serve(path.resolve(config.app.outputPath, 'client'), SERVE_OPTIONS, STATIC_FILES_MAP));
  // }

  if (config.app.env === 'production') {
    app.use(function* templateRender(next) {
      const indexPath = config.build.index;
      this.render = views(indexPath, {
        map: { html: 'swig' },
        cache: config.app.env === 'development' ? 'memory' : false,
      });
      yield next;
    });
  }
}
