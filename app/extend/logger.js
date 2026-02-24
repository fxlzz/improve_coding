const log4js = require("log4js");

/**
 * 日志分析器
 * 使用：app.logger.log | app.logger.error | app.logger.info...
 */
module.exports = (app) => {
  let logger;

  if (app.env.isLocal()) {
    logger = console;
  } else {
    log4js.configure({
      appenders: {
        console: {
          type: "console",
        },
        dateFile: {
          type: "dateFile",
          filename: "./logs/app.log",
          pattern: "yyyy-MM-dd",
        },
      },
      categories: {
        default: {
          appenders: ["console", "dateFile"],
          level: "trace",
        },
      },
    });

    logger = log4js.getLogger();
  }

  return logger;
};
