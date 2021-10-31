const { createLogger, format, transports, level } = require('winston');
const { combine, timestamp} = format;
require('dotenv').config();

const transport = new transports.File({ filename: './logger/applogs.log' });

const logger = createLogger({
  format: combine(
    timestamp({format : 'YYYY-MM-DD hh:mm:ss'}),
    format.align(),
    format.simple()
  ),
  exitOnError : true,
  transports : [transport]
});

module.exports = { logger }
