import commonService from '@server/services/commonService';

async function getList(Model, ctx) {
  const { conds = {}, orders = null, ranges = null } = ctx.query;
  const data = await commonService.getList(Model, conds, orders, ranges);
  return { data, stats: ranges };
}

async function remove(Model, ctx) {
  const id = ctx.params.id;
  const data = await commonService.remove(Model, id);
  return { success: true };
}

export default {
  getList,
  remove,
};
