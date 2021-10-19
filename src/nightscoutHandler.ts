import { FastifyRequest, FastifyReply } from "fastify";
import logdown, { Logger } from "logdown";
import { getEntries } from "./NightscoutApi";
import { mgdlToMmoll, roundGlucose } from "./utils";

const logger = logdown("nightscoutHandler");

export const nightscoutHandler = async function (
  request: FastifyRequest,
  reply: FastifyReply
) {
  const nsUrl = (request.query as any).nightscoutUrl;

  if (!nsUrl) {
    return {
      error: "Missing nightscoutUrl querystring",
    };
  }

  logger.info(nsUrl);
  const entries = await getEntries(nsUrl);
  logger.info(entries.length);

  const latestEntry = entries[0];

  return {
    frames: [
      {
        text: roundGlucose(mgdlToMmoll(latestEntry.sgv)),
        icon: 61,
      },
      {
        chartData: entries
          .map((entry) => roundGlucose(mgdlToMmoll(entry.sgv)))
          .reverse(),
      },
    ],
  };
};
