import config from '@global/config';

async function renderIndex(ctx, next) {
  if (config.app.env === 'development') {
    await next();
    return;
  }
  if (/^\/api/.test(ctx.request.url)) {
    await next();
    return;
  }
  return ctx.render('index');
}

export default {
  renderIndex,
};
