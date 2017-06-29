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
   *   /api/note
   */
  router.get('/api/notes', commonCtrl.getList('NoteDetail'));
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
  router.post('/api/notes', commonCtrl.create('NoteDetail'));
  router.put('/api/notes/:id', commonCtrl.edit('NoteDetail'));
  router.del('/api/notes/:id', commonCtrl.remove('NoteDetail'));
  router.put('/api/notes/:id/editLabel', noteCtrl.editLabel);
  router.get('/api/labels', commonCtrl.getList('Label'));
  router.post('/api/labels', commonCtrl.create('Label'));
  router.put('/api/labels/:id', commonCtrl.edit('Label'));
  router.del('/api/labels/:id', commonCtrl.remove('Label'));

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
