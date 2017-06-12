import Router from 'koa-router';
import indexCtrl from '../controllers/indexCtrl';
import recordingCtrl from '../controllers/recordingCtrl';

//const authCtrl = require('../controllers/authCtrl');

const common = new Router();
const router = new Router();

export default (app) => {
  common.get('*', indexCtrl.index);
  //common.get('/auth/login', authCtrl.getCurrentUser);
  //common.post('/auth/login', authCtrl.login);
  //common.all('/auth/logout', authCtrl.logout);

  /**
   * {小区管理} - 获取同步待确认的小区信息列表
   * @query  {String} type 数据类型，如Community，Building，House
   * @query  {String} condition 查询条件
   * @query  {String} ranges 分页信息，形如ranges=0,99，查询第0-99条数据
   * @return {Array} data 小区列表信息
   * @return {Object} page 分页信息
   * @throws {Object} error 错误信息
   * @example
   *   /api/v1/syncDatas?type=Community&condition=dddd&ranges=1,100
   */
  router.get('/api/v1/syncDatas', recordingCtrl.getSyncDatas);

  /**
   * {小区管理} - 确认同步小区信息列表
   * @query  {String} type 数据类型，如Community，Building，House
   * @body   {Array} remove 确认删除的数据列表
   * @body   {Array} update 经过修改并确认的数据列表
   * @return {Array} data 没有确认成功，需要再次编辑修改提交的数据；若全部确认成功，该列表为空
   * @return {Object} page 分页信息
   * @throws {Object} error 错误信息
   * @example
   *   /api/v1/syncDatas/save?type=Community
   */
  router.put('/api/v1/syncDatas/save', recordingCtrl.saveSyncDatas);

  /**
   * {小区管理} - 导入 excel 文件（小区、楼栋、房屋）
   * @query  {String} type  数据类型，如Community，Building，House
   * @body   {File}         导入文件
   * @return {Array} data   待确认小区列表信息
   * @throws {Object} error 错误信息
   * @example
   *   /api/v1/files/import?type=Community
   */
  router.post('/api/v1/files/import', recordingCtrl.importExcel);

  /**
   * {小区管理} - 确认导入 excel 数据（小区、楼栋、房屋）
   * @query  {String} type  数据类型，如Community，Building，House
   * @body   {Array}        确认导入的数据列表
   * @return {Array} data   没有确认成功，需要再次编辑修改提交的数据；若全部确认成功，该列表为空
   * @throws {Object} error 错误信息
   * @example
   *   /api/v1/files/import/save?type=Community
   */
  router.put('/api/v1/files/import/save', recordingCtrl.saveExcel);

  /**
   * {房屋导出} - 小区房屋信息导出
   * @body  {Array} ids           选中导出房屋id列表
   * @return {Object}  data       导出结果
   * @throws {Object} error      错误信息
   * @example
   *   /api/v1/files/export?type=House
   */
  router.get('/api/v1/files/export', recordingCtrl.exportExcel);

  //router.post('/api/v1/buildings/import', recordingCtrl.importExcel);
  //router.put('/api/v1/buildings/import/save', recordingCtrl.saveExcel);

  //router.post('/api/v1/houses/import', recordingCtrl.importExcel);
  //router.put('/api/v1/houses/import/save', recordingCtrl.saveExcel);

  //router.post('/api/v1/comittees/import', recordingCtrl.importExcel);
  //router.put('/api/v1/comittees/import/save', recordingCtrl.saveExcel);

  //router.post('/api/v1/developers/import', recordingCtrl.importExcel);
  //router.put('/api/v1/developers/import/save', recordingCtrl.saveExcel);

  //router.post('/api/v1/properties/import', recordingCtrl.importExcel);
  //router.put('/api/v1/properties/import/save', recordingCtrl.saveExcel);

  app
    .use(common.routes())
    .use(common.allowedMethods());

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
