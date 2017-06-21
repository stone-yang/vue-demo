import Router from 'koa-router';
import noteCtrl from '@server/controllers/noteCtrl';
import indexCtrl from '@server/controllers/indexCtrl';
import commonCtrl from '@server/controllers/commonCtrl';

const router = new Router();

export default (app) => {
  router.get('*', indexCtrl.renderIndex);

  /**
   * {Note} - query all notes
   * @body   {Object} conds - query conditions
   * @body   {Object} orders - query orders
   * @body   {Object} ranges - query ranges
   * @return {Array} data - notes list
   * @return {Object} stats - statistics information
   * @throws {Object} error
   * @example
   *   /api/note/query
   */
  router.get('/api/note/query', commonCtrl.getList('NoteDetail'));
  /**
   * {Note} - create note
   * @body   {Object}  data - new note info
   * @body   {Object}  data - new note info
   * @return {Object}  data - note created info
   * @return {Boolean} success - operation status
   * @throws {Object}  error
   * @example
   *   /api/note/create
   */
  router.post('/api/note/create', commonCtrl.create('NoteDetail'));
  router.put('/api/note/edit/:id', commonCtrl.edit('NoteDetail'));
  router.del('/api/note/remove/:id', commonCtrl.remove('NoteDetail'));
  router.put('/api/note/editLabel/:id', noteCtrl.editLabel);
  router.get('/api/label/query', commonCtrl.getList('Label'));
  router.post('/api/label/create', commonCtrl.create('Label'));
  router.put('/api/label/edit/:id', commonCtrl.edit('Label'));
  router.del('/api/label/remove/:id', commonCtrl.remove('Label'));

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
