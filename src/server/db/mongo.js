import mongoose from 'mongoose';
import fs from 'fs';

import globalConfig from '../../../config';
import getSchema from './getSchema';

/**
 * Connect to database
 */
const mongoConnect = function mongoConnect() {
  mongoose.connect(globalConfig.mongo.url);
  mongoose.set('debug', globalConfig.app.env);
  mongoose.Promise = global.Promise;
  mongoose.connection.on('error', (err) => {
    console.error(err.stack);
  });
  const connection = new Promise((resolve) => {
    mongoose.connection.once('open', () => {
      console.log('mongoose connect success');
      resolve(mongoose.connection);
    });
  });
  return connection;
};

/**
 * Load the models
 */
const registerModels = function registerModels(loadMiddlewares) {
  fs.readdirSync(globalConfig.app.modelsPath)
    .filter(dir => dir !== '.DS_Store')
    .forEach((file) => {
      // find mongo models
      const model = require(`@models/${file}`).default;
      const schema = getSchema(model);
      const modelName = file.replace(/\.js/, '');
      loadMiddlewares(modelName, schema);

      mongoose.model(modelName, schema);
    });
};

export {
  registerModels,
  mongoConnect,
};
