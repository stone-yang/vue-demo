import commonService from '@server/services/commonService';
import qs from 'qs';

function getList(modelName) {
  return async function (ctx, next) {
    const { conds = {}, orders = null, ranges = null } = qs.parse(ctx.query);
    const data = await commonService.getList(modelName, conds, orders, ranges);
    ctx.body = { data, stats: ranges, success: true };
    await next();
  };
}

function create(modelName) {
  return async function (ctx, next) {
    const createBody = ctx.request.body;
    await commonService.create(modelName, createBody);
    const { conds = {}, orders = null, ranges = null } = qs.parse(ctx.query);
    const data = await commonService.getList(modelName, conds, orders, ranges);
    ctx.body = { success: true, data };
    await next();
  };
}

function edit(modelName) {
  return async function (ctx, next) {
    const id = ctx.params.id;
    const editBody = ctx.request.body;
    await commonService.edit(modelName, id, editBody);
    const { conds = {}, orders = null, ranges = null } = qs.parse(ctx.query);
    const data = await commonService.getList(modelName, conds, orders, ranges);
    ctx.body = { success: true, data };
    await next();
  };
}

function remove(modelName) {
  return async function remove(ctx, next) {
    const id = ctx.params.id;
    await commonService.remove(modelName, id);
    const { conds = {}, orders = null, ranges = null } = qs.parse(ctx.query);
    const data = await commonService.getList(modelName, conds, orders, ranges);
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
