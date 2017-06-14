const { spawn, exec } = require('child_process');
const webpack = require('webpack');
const config = require('../config');
const utils = require('./utils');
const webpackServerConfig = require('./webpack.server.conf');

// clear hot update files 
utils.clearDir(config.build.assetsRoot);

let started = false;
webpack(webpackServerConfig).watch({
    aggregateTimeout: 300, // wait so long for more changes
    poll: true // use polling instead of native watchers
    // pass a number to set the polling interval
}, function(err, stats) {
  if (!started) {
    const server = spawn('babel-node', ['dist/server.js']);
    server.stdout.on('data', (data) => process.stdout.write(data));
    server.stderr.on('data', (data) => process.stderr.write(data));
    server.on('exit', (code) => {
      console.log(`child process exited with code ${code}`);
    });
    started = true;
  }
});
