import bunyan from "bunyan";
import fs from "fs";

const plainTextStream = {
  write: (log) => {
    const { level, msg, time, hostname, pid } = JSON.parse(log);
    const levelName = bunyan.nameFromLevel[level];
    const formatted = `[${hostname}:${pid}] [${new Date(
      time
    ).toLocaleString()}] ${levelName.toUpperCase()}: ${msg}`;

    fs.appendFileSync("bot.log", formatted + "\n");
    // show log on console
    console.log(formatted);
  },
};

const baseLogger = bunyan.createLogger({
  name: 'myapp',
  streams: [{ level: 'info', stream: plainTextStream }], // Log all levels above info
});

const log = {
  info(message) {
    baseLogger.info(message);
  },
  warn(message) {
    baseLogger.warn(message);
  },
  error(message) {
    baseLogger.error(message);
  },
};

export default log;
