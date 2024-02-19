// we need to import it to make transports.DailyRotate is available
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

// file on daily rotation (error only)
const errorLevelLog = new transports.DailyRotateFile({
  // %DATE will be replaced by the current date
  filename: `logs/%DATE%-error.log`,
  level: 'error',
  format: format.combine(format.timestamp(), format.json()),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false, // don't want to zip our logs
  maxFiles: '30d', // will keep log until they are older than 30 days
});

// same for all levels
const allLevelLog = new transports.DailyRotateFile({
  filename: `logs/%DATE%-combined.log`,
  format: format.combine(format.timestamp(), format.json()),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxFiles: '30d',
});

const dailyRotateLog = new transports.DailyRotateFile({
  filename: `logs/%DATE%-combined.log`,
  format: format.combine(format.timestamp(), format.json()),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxFiles: '30d',
});

const consoleLog = new transports.Console({
  format: format.combine(
    format.cli(),
    format.splat(),
    format.timestamp(),
    format.printf((info) => {
      return `${info.timestamp} ${info.level}: ${info.message}`;
    }),
  ),
});

export const winstonLogger = WinstonModule.createLogger({
  transports: [errorLevelLog, allLevelLog, dailyRotateLog, consoleLog],
});
