import { FastifyRequest, FastifyReply } from "fastify";
import logdown, { Logger } from "logdown";
import { getEntries } from "./NightscoutApi";
import { mgdlToMmoll, roundGlucose } from "./utils";

const logger = logdown("nightscoutHandler");

export const nightscoutHandler = async function (
  request: FastifyRequest,
  reply: FastifyReply
) {
  // request.query.nightscoutUrl
  logger.info((process.env as any).NS_URL);
  const entries = await getEntries((process.env as any).NS_URL);
  logger.info(entries.length);

  const latestEntry = entries[0];

  return {
    frames: [
      {
        text: roundGlucose(mgdlToMmoll(latestEntry.sgv)),
        icon: 61,
      },
      {
        chartData: entries.map((entry) => roundGlucose(mgdlToMmoll(entry.sgv))),
      },
    ],
  };
};
