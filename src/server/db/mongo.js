import mongoose from 'mongoose';
import fs from 'fs';

import globalConfig from '@global/config';
import getSchema from './getSchema';

/**
 * Connect to database
 */
mongoose.connect(globalConfig.mongo.url);
mongoose.set('debug', globalConfig.app.env);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(err.stack);
});
mongoose.connection.once('open', () => {
  console.log('mongoose connect success');
});

/**
 * Load the models
 */
fs.readdirSync(globalConfig.app.modelsPath)
  .filter(dir => dir !== '.DS_Store')
  .forEach((file) => {
    // find mongo models
    const model = require(`@models/${file}`).default;
    const schema = getSchema(model);
    const modelName = file.replace(/\.js/, '');

    mongoose.model(modelName, schema);
  });

