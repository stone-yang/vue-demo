import { mongoConnect, registerModels } from './mongo';
import loadMiddlewares from './middlewares';

/**
 * Connect to database
 * 连接数据库
 */
mongoConnect();

/**
 * Register models and load middlewares
 * 注册数据模型，加载模型中间件
 */
registerModels(loadMiddlewares);
