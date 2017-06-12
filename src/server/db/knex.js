/**
 * Knex initialization
 */
import knex from 'knex';
import globalConfig from '../../../global.config';

let knexConfig = knex({
  client: 'mysql',
  connection: globalConfig.mysql,
  debug: true,
});

export default knexConfig;
