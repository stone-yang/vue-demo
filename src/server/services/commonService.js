import mongoose from 'mongoose';

const getList = async function getList(modelName, conds, orders, ranges) {
  const QueryBuilder = mongoose.model(modelName).find(conds);
  console.log('orders', orders);

  orders && QueryBuilder.sort(orders);

  if (ranges) {
    const { limit, offset } = ranges;
    limit && QueryBuilder.limit(limit);
    offset && QueryBuilder.skip(offset);
  }

  const dbRes = await QueryBuilder;

  return dbRes;
};

function formatModelData(obj) {
  console.log(obj);
  Object.keys(obj).forEach((key) => {
    if (obj[key] === '') {
      obj[key] = null;
    }
  });
  return obj;
}

async function create(modelName, body) {
  const data = formatModelData(body);
  data.createTime = new Date().getTime();
  const dbRes = await mongoose.model(modelName).create(data);
  return dbRes;
}

async function edit(modelName, id, body) {
  const data = formatModelData(body);
  const dbRes = await mongoose.model(modelName).update({ _id: id }, { $set: data });
  return dbRes;
}

async function remove(modelName, id) {
  const dbRes = await mongoose.model(modelName).deleteOne({ _id: id });
  return dbRes;
}

export default {
  getList,
  create,
  edit,
  remove,
};
