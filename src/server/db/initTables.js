import knex from './knex';
import dbInit from '../../../test/mock/db_init';

export default (isDropExist) => {
  if (!isDropExist) return;

  console.log('开始清空数据库表...');

  knex.schema.dropTableIfExists('sub_accts').then(() => {
    return knex.schema.dropTableIfExists('users');
  }).then(() => {
    return knex.schema.dropTableIfExists('roles');
  }).then(() => {
    console.log('数据库表已清空...');
  }).then(() => {
    console.log('创建 角色表 （ roles ）...');
    /**
     * 角色表
     */
    return knex.schema.createTableIfNotExists('roles', (t) => {
      t.charset('utf8');
      t.increments('id').primary();                                       // id
      t.string('role_name');                                             // 角色名称
      t.string('role_desc');                                             // 角色描述
      t.bigInteger('permission_code').defaultTo(0);                       // 角色权限码（十进制）
      t.boolean('status').defaultTo(1);                                   // 状态：1可用 -1禁用
    });
  }).then(() => {
    console.log('创建 用户表 （ users ）...');
    /**
     * 用户表
     */
    return knex.schema.createTableIfNotExists('users', (t) => {
      t.charset('utf8');
      t.increments('id').primary();                             // id
      t.string('username');                                     // 用户名
      t.string('name');                                         // 显示名
      t.string('password');                                     // 用户密码
      t.integer('role_id').unsigned().references('roles.id');   // 用户角色id
      t.boolean('status').defaultTo(1);                         // 状态：1可用 -1禁用
    });
  }).then(() => {
    console.log('数据库建表完成！');
  }).then(() => {
    console.log('开始插入基础数据...');
    return dbInit(knex);
  }).then(() => {
    console.log('插入基础数据完成！');
  }).catch((e) => {
    console.error(e.stack);
  });
};
