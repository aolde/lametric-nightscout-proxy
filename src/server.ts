import fastify from "fastify";
import fastifyGracefulShutdown from "fastify-graceful-shutdown";
import logdown from "logdown";
import { nightscoutHandler } from "./nightscoutHandler";

const logger = logdown("example");

const server = fastify({ logger: true });

server.register(fastifyGracefulShutdown);

server.get("/", nightscoutHandler);

server.get("/health", (_, reply) => {
  reply.send("ok");
});

const address = process.env.HTTP_ADDRESS || "127.0.0.1";
const port = process.env.PORT || process.env.HTTP_PORT || 3000;

const start = async () => {
  try {
    await server.listen(port, address);
  } catch (error) {
    logger.error(error);
    server.log.error(error);
    process.exit(1);
  }
};

start();
