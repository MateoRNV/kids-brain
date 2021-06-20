const winston = require('winston');
require('winston-daily-rotate-file');

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = winston.createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss A' }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      filename: 'logs/error/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD HH:MM A',
      //zippedArchive: true,
      maxSize: '10m',
      maxFiles: '15d',
      level: 'error'
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/combined/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD HH:MM A',
      //zippedArchive: true,
      maxSize: '10m',
      maxFiles: '15d',
    }),
  ],
});

module.exports = logger;
