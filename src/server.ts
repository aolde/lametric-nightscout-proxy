import fastify from "fastify";
import fastifyGracefulShutdown from "fastify-graceful-shutdown";
import logdown from "logdown";

const logger = logdown("example");

const server = fastify({ logger: true });

server.register(fastifyGracefulShutdown);

server.get("/", (_, reply) => {
  logger.info("hello world"); // example logging
  reply.send("hello world");
});

server.get("/health", (_, reply) => {
  reply.send("ok");
});

const address = process.env.HTTP_ADDRESS || "127.0.0.1";
const port = process.env.HTTP_PORT || 3000;

const start = async () => {
  try {
    await server.listen(port, address);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
