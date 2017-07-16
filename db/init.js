const { spawn, exec } = require('child_process');
const path = require('path');
const config = require('../config');
const { mongoConnect } = require('../src/server/db/mongo');

const DUMP_DIR = path.resolve(__dirname, 'mongodump');

// clear database
mongoConnect().then((connection) => {
  connection.db.dropDatabase();
  const initProcess = spawn('mongorestore', ['-dnoteskeep', `--dir=${DUMP_DIR}`]);
  initProcess.stdout.on('data', (data) => process.stdout.write(data));
  initProcess.stderr.on('data', (data) => process.stderr.write(data));
  initProcess.on('exit', (code) => {
    if (code === 0) {
      console.log('Finished process init db.');
      return;
    }
    console.log(`child process exited with code ${code}`);
  });
});
