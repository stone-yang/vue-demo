import mongoose from 'mongoose';
import fs from 'fs';

import globalConfig from '../../../global.config';
import getSchema from '../libs/schema';

/**
 * Connect to database
 */
mongoose.connect(globalConfig.mongo.url);
mongoose.set('debug', globalConfig.app.env);
mongoose.connection.on('error', (err) => {
  console.error(err.stack);
});

/**
 * Load the models
 */
fs.readdirSync(globalConfig.app.modelsPath).forEach((file) => {
  // find mongo models
  if (file.substr(0, 1) !== 'T') {
    const model = require(`../../models/${file}`).default;
    const schema = getSchema(model);
    const modelName = file.replace(/\.js/, '');

    mongoose.model(modelName, schema);
  }
});
