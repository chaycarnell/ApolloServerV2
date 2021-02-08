const logger = {
  debug: (msg, context) =>
    console.debug(`Timestamp: ${new Date().toISOString()}`, msg, context || ""),
  info: (msg, context) =>
    console.info(`Timestamp: ${new Date().toISOString()}`, msg, context || ""),
  warn: (msg, context) =>
    console.warn(`Timestamp: ${new Date().toISOString()}`, msg, context || ""),
  error: (msg, context) =>
    console.error(`Timestamp: ${new Date().toISOString()}`, msg, context || ""),
};

module.exports = logger;
