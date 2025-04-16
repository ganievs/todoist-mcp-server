import winston from "winston";

const { combine, timestamp, json } = winston.format;

let transport
if (process.env.MCP_ENABLE_FILE_LOGGING === 'true') {
  transport = new winston.transports.File({ filename: 'todoist-mcp-server.log' })
} else {
  transport = new winston.transports.Console();
}

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    transport
  ]
});
