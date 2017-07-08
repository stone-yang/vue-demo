import mongoose from 'mongoose';

const getList = async function getList(modelName, conds, orders, ranges, related) {
  const QueryBuilder = mongoose.model(modelName).find(conds);
  console.log('orders', orders);

  orders && QueryBuilder.sort(orders);

  // query range
  if (ranges) {
    const { limit, offset } = ranges;
    limit && QueryBuilder.limit(limit);
    offset && QueryBuilder.skip(offset);
  }

  // populate fields
  if (related) {
    console.log('related', related);
    const _f = (path) => {
      const fields = path.split('|');
      const param = { path: fields.shift() };
      let obj = param;
      for (const field of fields) {
        obj.populate = { path: field };
        obj = obj.populate;
      }
      return param;
    };
    let _related = related;
    if (typeof related === 'string') {
      _related = [related];
    }
    for (const path of _related) {
      const relatedParam = _f(path);
      QueryBuilder.populate(relatedParam);
    }
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
  const doc = await mongoose.model(modelName).findOne({ _id: id });
  const dbRes = await doc.remove();
  return dbRes;
}

export default {
  getList,
  create,
  edit,
  remove,
};
