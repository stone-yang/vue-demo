import mongoose from 'mongoose';

/**
 * apply mongoose middlewares
 * 加载模型中间件
 *
 * @param {any} modelName
 * @param {any} schema
 */
function loadMiddlewares(modelName, schema) {
  if (modelName === 'Label') {
    schema.pre('remove', function (next) {
      mongoose.model('NoteDetail').updateMany({ labels: this._id }, { $pull: { labels: this._id } })
        .then( () => {
          next();
        })
        .catch( (e) => {
          next(e);
        });
    });
  }
  if (modelName === 'NoteDetail') {
    schema.pre('remove', function (next) {
      mongoose.model('Label').updateMany({ notes: this._id }, { $pull: { notes: this._id } })
        .then( () => {
          next();
        })
        .catch( (e) => {
          next(e);
        });
    });
  }

  return schema;
}

export default loadMiddlewares;
