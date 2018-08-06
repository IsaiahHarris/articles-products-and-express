const fs = require('fs');
const logger = require('morgan');
const path = require('path');
const now = new Date();
const logfile_name = now.getFullYear() + "-"+ now.getMonth() + "-" + now.getDate() +'.log'

function accessLogStream (){
  return fs.createWriteStream(path.join(__dirname, `../logs/${logfile_name}`), {flags: 'a'})
};
module.exports = {
  accessLogStream
};