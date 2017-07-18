import mongoose from 'mongoose';

/**
 * query data from model
 * @param {String} modelName a model which was registered 操作的model名称
 * @param {Object} conds query conditions 查询条件
 * @param {Object} orders query orders 查询结果排序 e.g.{ createTime: -1 }
 * @param {Object} ranges query ranges 查询结果范围 e.g.{ limit: 10, offset: 10 }
 * @param {String} related populate embeded object info (split with '|')
 *  显示下级嵌入对象的详细信息(支持多级,按竖线分隔) e.g.'note|label'
 * @return {Array} dbRes query result
 */
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

/**
 * create an object at model 根据model名称创建对象
 * @param {String} modelName a model which was registered 操作的model名称
 * @param {Object} body create info 新建对象详细信息
 */
async function create(modelName, body) {
  const data = formatModelData(body);
  data.createTime = new Date().getTime();
  const dbRes = await mongoose.model(modelName).create(data);
  return dbRes;
}

/**
 * edit an object 根据model名称修改已创建的对象
 * @param {String} modelName a model which was registered 操作的model名称
 * @param {String} id
 * @param {Object} body edit info 修改信息
 */
async function edit(modelName, id, body) {
  const data = formatModelData(body);
  const dbRes = await mongoose.model(modelName).update({ _id: id }, { $set: data });
  return dbRes;
}

/**
 * remove an object 根据model名称删除已创建的对象
 * @param {String} modelName a model which was registered 操作的model名称
 * @param {String} id
 */
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
