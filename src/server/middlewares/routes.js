import Router from 'koa-router';
import noteCtrl from '@server/controllers/noteCtrl';
import indexCtrl from '@server/controllers/indexCtrl';
import commonCtrl from '@server/controllers/commonCtrl';

const router = new Router();

export default (app) => {
  router.get('*', indexCtrl.renderIndex);

  /**
   * {Note} - query notes record list
   * 按条件查询笔记的记录
   * @query   {Object} conds - query conditions 查询条件
   * @query   {Object} orders - query orders 查询结果排序 e.g.{ createTime: -1 }
   * @query   {Object} ranges - query ranges 查询结果范围 e.g.{ limit: 10, offset: 10 }
   * @query   {String} related - populate embeded object info (split with '|')
   * 显示下级嵌入对象的详细信息(多级按竖线分隔) e.g.'note|label'
   * @return {Array} data - notes list 笔记信息列表
   * @return {Object} stats - statistics information 统计信息
   * @throws {Object} error
   * @example
   *  GET /api/notes?orders%5BcreateTime%5D=-1&related=labels
   */
  router.get('/api/notes', commonCtrl.getList('NoteDetail'));
  /**
   * {Note} - create note
   * 创建新笔记
   * @query   {Object} conds - query conditions 查询条件
   * @query   {Object} orders - query orders 查询结果排序 e.g.{ createTime: -1 }
   * @query   {Object} ranges - query ranges 查询结果范围 e.g.{ limit: 10, offset: 10 }
   * @query   {Object} related - populate embeded object info (split with '|')
   * @body    {Object}  data - new note info 新创建笔记的详细信息
   * @return  {Array}  data - updated notes list 更新后的笔记信息列表
   * @return  {Boolean} success - operation status 操作是否成功
   * @throws  {Object}  error
   * @example
   *  POST /api/notes?orders%5BcreateTime%5D=-1&related=labels
   */
  router.post('/api/notes', commonCtrl.create('NoteDetail'));
  /**
   * {Note} - edit note
   * 编辑已创建的笔记
   * @param   {String}  id - note id 已创建笔记的id
   * @query   {Object} conds - query conditions 查询条件
   * @query   {Object} orders - query orders 查询结果排序
   * @query   {Object} ranges - query ranges 查询结果范围 e.g.{ limit: 10, offset: 10 }
   * @query   {Object} related - populate embeded object info (split with '|')
   * @body    {Object}  data - note edit info 修改详情
   * @return  {Array}  data - updated notes list 更新后的笔记信息列表
   * @return  {Boolean} success - operation status 操作是否成功
   * @throws  {Object}  error
   * @example
   *  PUT /api/notes/595f5849f9436315a593a2d4?orders%5BcreateTime%5D=-1&related=labels
   */
  router.put('/api/notes/:id', commonCtrl.edit('NoteDetail'));
  /**
   * {Note} - remove note
   * 删除已创建的笔记
   * @param   {String}  id - note id 已创建笔记的id
   * @query   {Object} conds - query conditions 查询条件
   * @query   {Object} orders - query orders 查询结果排序
   * @query   {Object} ranges - query ranges 查询结果范围 e.g.{ limit: 10, offset: 10 }
   * @query   {Object} related - populate embeded object info (split with '|')
   * @body    {Object}  data - note edit info 修改详情
   * @return  {Array}  data - updated notes list 更新后的笔记信息列表
   * @return  {Boolean} success - operation status 操作是否成功
   * @throws  {Object}  error
   * @example
   *  DELETE /api/notes/595f5849f9436315a593a2d4?orders%5BcreateTime%5D=-1&related=labels
   */
  router.del('/api/notes/:id', commonCtrl.remove('NoteDetail'));
  /**
   * {Note} - edit labels on a note
   * 编辑笔记所关联的标签
   * @param   {String}  id - note id 已创建笔记的id
   * @body    {String}  label - label id
   * @body    {Bealoon} isAdd - true: add label  false: remove label
   * @return  {Array}  data - updated notes list 更新后的笔记信息列表
   * @return  {Boolean} success - operation status 操作是否成功
   * @throws  {Object}  error
   * @example
   *  PUT /api/notes/595f5849f9436315a593a2d4?orders%5BcreateTime%5D=-1&related=labels
   */
  router.put('/api/notes/:id/editLabel', noteCtrl.editLabel);
  /**
   * {Labels} - query labels record list
   * 查询标签记录
   * @query   {Object} conds - query conditions 查询条件
   * @query   {Object} orders - query orders 查询结果排序 e.g.{ createTime: -1 }
   * @query   {Object} ranges - query ranges 查询结果范围 e.g.{ limit: 10, offset: 10 }
   * @query   {String} related - populate embeded object info (split with '|')
   * 显示下级嵌入对象的详细信息(多级按竖线分隔)
   * @return {Array} data - labels list 标签信息列表
   * @return {Object} stats - statistics information 统计信息
   * @throws {Object} error
   * @example
   *  GET /api/labels?orders%5BcreateTime%5D=-1
   */
  router.get('/api/labels', commonCtrl.getList('Label'));
  /**
   * {Labels} - create label
   * 创建新标签
   * @query   {Object} conds - query conditions 查询条件
   * @query   {Object} orders - query orders 查询结果排序 e.g.{ createTime: -1 }
   * @query   {Object} ranges - query ranges 查询结果范围 e.g.{ limit: 10, offset: 10 }
   * @query   {Object} related - populate embeded object info (split with '|')
   * @body    {Object}  data - new label info 新创建标签的详细信息
   * @return  {Array}  data - updated labels list 更新后的标签信息列表
   * @return  {Boolean} success - operation status 操作是否成功
   * @throws  {Object}  error
   * @example
   *  POST /api/labels?orders%5BcreateTime%5D=-1
   */
  router.post('/api/labels', commonCtrl.create('Label'));
  /**
   * {Labels} - edit label
   * 编辑已创建的标签
   * @param   {String}  id - label id 已创建标签的id
   * @query   {Object} conds - query conditions 查询条件
   * @query   {Object} orders - query orders 查询结果排序
   * @query   {Object} ranges - query ranges 查询结果范围 e.g.{ limit: 10, offset: 10 }
   * @query   {Object} related - populate embeded object info (split with '|')
   * @body    {Object}  data - label edit info 修改详情
   * @return  {Array}  data - updated labels list 更新后的标签信息列表
   * @return  {Boolean} success - operation status 操作是否成功
   * @throws  {Object}  error
   * @example
   *  PUT /api/labels/596b7ae8f07c3557a61e3e3c?orders%5BcreateTime%5D=-1
   */
  router.put('/api/labels/:id', commonCtrl.edit('Label'));
  /**
   * {Labels} - remove label
   * 删除已创建的笔记
   * @param   {String}  id - label id 已创建笔记的id
   * @query   {Object} conds - query conditions 查询条件
   * @query   {Object} orders - query orders 查询结果排序
   * @query   {Object} ranges - query ranges 查询结果范围 e.g.{ limit: 10, offset: 10 }
   * @query   {Object} related - populate embeded object info (split with '|')
   * @body    {Object}  data - label edit info 修改详情
   * @return  {Array}  data - updated labels list 更新后的笔记信息列表
   * @return  {Boolean} success - operation status 操作是否成功
   * @throws  {Object}  error
   * @example
   *  DELETE /api/labels/595f5849f9436315a593a2d4?orders%5BcreateTime%5D=-1
   */
  router.del('/api/labels/:id', commonCtrl.remove('Label'));

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
