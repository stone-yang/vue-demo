import mongoose from 'mongoose';

/**
 * convert model to mongoose schema
 * @param  {Object} model plain data model
 * @return {[type]} schema model
 */
function getSchema(model) {
  const schema = {};
  Object.keys(model)
    .filter(key => key !== 'id')
    .forEach((key) => {
      const field = Object.assign({}, model[key]);

      if (field.define) {
        schema[key] = field.define;
        return;
      }

      if (!field.ref) {
        schema[key] = field.isArray ? [field] : field;
      } else {
        field.type = mongoose.Schema.Types.ObjectId;
        schema[key] = field.isArray ? [field] : field;
      }
    });

  const thisSchema = new mongoose.Schema(schema);
  // thisSchema.plugin(beautifyUnique);

  // thisSchema.pre('save', function (next) {
  //   mongoMultiUniqueValidator(modelName, model, this, next);
  // });

  return thisSchema;
}

export default getSchema;
