import config from '@global/config';

/**
 * handle html5 history fallback 在未匹配api路径的情况下返回index.html
 */
async function renderIndex(ctx, next) {
  // at development env, this would be handled by webpack-dev-server
  if (config.app.env === 'development') {
    await next();
    return;
  }
  // filter api resquests
  if (/^\/api/.test(ctx.request.url)) {
    await next();
    return;
  }
  return ctx.render('index');
}

export default {
  renderIndex,
};
