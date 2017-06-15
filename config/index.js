// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

const DEV_ENV = require('./dev.env'); 
const BUILD_ENV = require('./prod.env');
const NODE_ENV = process.env.NODE_ENV || 'development';
const APP_PORT = process.env.APP_PORT || 3000;                        // app listen port
const APP_DEV_PORT = process.env.APP_DEV_PORT || 8080;                // app listen port development
const MONGO_HOST = process.env.MONGO_HOST || '127.0.0.1';             // mongo address

module.exports = {
  app: {
    port: APP_PORT,
    env: NODE_ENV,
    debug: true,
    modelsPath: path.resolve(__dirname, '../src/models'),
    globalPath: path.resolve(__dirname, '..'),
    clientFilePath: path.resolve(__dirname, '../src/client'),
    serverFilePath: path.resolve(__dirname, '../src/server'),
  },
  mongo: {
    url: `mongodb://${MONGO_HOST}:27017/noteskeep`,
  },
  build: {
    env: BUILD_ENV,
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    serverPath: path.resolve(__dirname, '../src/server', 'server.js'),
    // nodeModulesPath: path.resolve(process.cwd(), 'node_modules'),     // npm 安装依赖包文件夹路径
    nodeModulesPath: path.resolve(__dirname, '..', 'node_modules'),
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: DEV_ENV,
    port: APP_DEV_PORT,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    serverPath: path.resolve(__dirname, '../src/server', 'server.dev.js'),
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
