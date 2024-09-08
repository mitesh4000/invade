const winston = require("winston");

const logger = winston.createLogger({
  level: `info`,
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transport: [
    new winston.transports.File({ filename: "error.log", level: "info" }),
  ],
});

export default logger;
