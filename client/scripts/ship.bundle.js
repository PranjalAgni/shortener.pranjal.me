const fs = require('fs-extra');
const path = require('path');

const copyDirectorySync = (source, target) => {
  fs.copy(source, target, function(err) {
    if (err) return console.error(err);
    console.log('success!');
  });
};
const source = path.join('./', 'dist');
const target = path.join('../', 'server/dist');

copyDirectorySync(source, target);
