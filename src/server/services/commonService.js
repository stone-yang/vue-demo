import mongoose from 'mongoose';

const getList = async function getList(Model, conds, orders, ranges) {
  const QueryBuilder = Model.find(conds);

  orders && QueryBuilder.sort(orders);

  if (ranges) {
    const { limit, offset } = ranges;
    limit && QueryBuilder.limit(limit);
    offset && QueryBuilder.skip(offset);
  }

  const res = await QueryBuilder;

  return res;
};

async function remove(Model, id) {
  const ObjectId = mongoose.Schema.Types.ObjectId;
  await Model.deleteOne({ _id: id });
}

export default {
  getList,
  remove,
};
