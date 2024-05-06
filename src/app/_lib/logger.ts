import { loggers, format, transports } from "winston";

loggers.add("default", {
  level: "info",
  exitOnError: true,
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss ZZ" }),
    format.printf(
      (info) =>
        `[${info.timestamp} - ${info.level.toUpperCase()}] ${info.message}`
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

const logger = loggers.get("default");

export default logger;
