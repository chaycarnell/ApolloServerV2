const { ApolloServer, gql } = require("apollo-server");

// Glue used for matching resolvers with type defs
const glue = require("schemaglue");
// Glue schemas/resolvers together
const { schema, resolver } = glue("src/schemas");

// Optional utils for assisting with logging and error handling
const errorHandler = require("./utils/errorHandler");
const logger = require("./utils/logger");
const loggerPlugin = require("./utils/loggerPlugin");

// Define server port
const port = process.env.PORT || 4001;

// Define Apollo Server
const server = new ApolloServer({
  typeDefs: gql(schema),
  resolvers: resolver,
  playground: process.env.NODE_ENV !== "production",
  formatError: (error) => errorHandler(error),
  logger,
  plugins: [loggerPlugin],
  context: async ({ req }) => {
    // Mock example of adding a user to request context if authorization header present
    // For production suggest to use GraphQL Shield in combination with JWT validation/decode utils
    const user = req.headers.authorization
      ? { id: "1000", name: "Mock User" }
      : null;
    // Return context
    return { user };
  },
});

// Start server listening
server.listen({ port }).then(({ url }) => {
  logger.info(`🚀  Server ready at ${url}`);
});
