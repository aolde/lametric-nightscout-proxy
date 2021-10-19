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
      frames: [
        {
          text: "Missing Nightscout URL",
          icon: 61,
        },
      ],
    };
  }

  logger.info(nsUrl);
  const entries = await getEntries(nsUrl);
  logger.info(entries.length);

  const latestEntry = entries[0];
  const glucose = roundGlucose(mgdlToMmoll(latestEntry.sgv));
  const delta = roundGlucose(mgdlToMmoll(latestEntry.delta));

  return {
    frames: [
      {
        text: glucose + " " + (latestEntry.delta > 0 ? "+" : "") + delta,
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
