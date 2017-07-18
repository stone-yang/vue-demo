import commonService from '@server/services/commonService';
import qs from 'qs';

/**
 * query data from model
 * @param {String} modelName a model which was registered
 */
function getList(modelName) {
  return async function (ctx, next) {
    const { conds = {}, orders = null, ranges = null, related = null } = qs.parse(ctx.query);
    const data = await commonService.getList(modelName, conds, orders, ranges, related);
    ctx.body = { data, stats: ranges, success: true };
    await next();
  };
}

/**
 * create an object at model
 * @param {String} modelName a model which was registered
 */
function create(modelName) {
  return async function (ctx, next) {
    const createBody = ctx.request.body;
    await commonService.create(modelName, createBody);
    const { conds = {}, orders = null, ranges = null, related = null } = qs.parse(ctx.query);
    const data = await commonService.getList(modelName, conds, orders, ranges, related);
    ctx.body = { success: true, data };
    await next();
  };
}

/**
 * edit an object which was previously created at a model
 * @param {String} modelName a model which was registered
 */
function edit(modelName) {
  return async function (ctx, next) {
    const id = ctx.params.id;
    const editBody = ctx.request.body;
    await commonService.edit(modelName, id, editBody);
    const { conds = {}, orders = null, ranges = null, related = null } = qs.parse(ctx.query);
    const data = await commonService.getList(modelName, conds, orders, ranges, related);
    ctx.body = { success: true, data };
    await next();
  };
}

/**
 * remove an object which was previously created at a model
 * @param {String} modelName a model which was registered
 */
function remove(modelName) {
  return async function remove(ctx, next) {
    const id = ctx.params.id;
    await commonService.remove(modelName, id);
    const { conds = {}, orders = null, ranges = null, related = null } = qs.parse(ctx.query);
    const data = await commonService.getList(modelName, conds, orders, ranges, related);
    ctx.body = { success: true, data };
    await next();
  };
}

export default {
  getList,
  create,
  edit,
  remove,
};
