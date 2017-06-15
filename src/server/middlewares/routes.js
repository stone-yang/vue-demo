import Router from 'koa-router';
import noteCtrl from '@server/controllers/noteCtrl';
// import commonCtrl from '@server/controllers/commonCtrl';

const router = new Router();

export default (app) => {
  router.get('*', async (ctx, next) => {
    if (/^\/api/.test(ctx.request.url)) {
      console.log('/api', true);
      await next();
      return;
    }
    return ctx.render('index');
  });

  /**
   * {Note} - query all notes
   * @return {Array} data notes list
   * @return {Object} stats statistics information
   * @throws {Object} error
   * @example
   *   /api/note/query
   */
  router.get('/api/note/query', noteCtrl.getAll);
  router.post('/api/note/create', noteCtrl.createNote);
  router.del('/api/note/remove/:id', noteCtrl.removeNote);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
