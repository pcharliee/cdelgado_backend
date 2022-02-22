import winston from 'winston';
const { combine, timestamp, json } = winston.format;

export const createLogger = () => {
  return winston.createLogger({
    format: combine( timestamp(), json() ),
    transports: [
      new winston.transports.Console({ level: 'info' }),
      new winston.transports.File({ filename: 'warns.log', level: 'warn' }),
      new winston.transports.File({ filename: 'errors.log', level: 'error' }),
    ]
  });
};
