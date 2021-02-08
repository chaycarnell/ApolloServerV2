// Handles logging at different stages of apollo server lifecycle events
const LoggingPlugin = {
  requestDidStart({ context, request, logger }) {
    const { user } = context;
    if (request.operationName !== "IntrospectionQuery")
      logger.info(
        `Operation: ${request.operationName}${
          user ? `, UserId: ${user.id}` : ""
        }`
      );
    return {
      // Handle logging errors encountered
      didEncounterErrors({ errors }) {
        logger.error(
          `Operation: ${request.operationName}${
            user ? `, UserId: ${user.id}` : ""
          }`,
          {
            errors,
          }
        );
      },
    };
  },
};

module.exports = LoggingPlugin;
