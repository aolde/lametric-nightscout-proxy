import { FastifyRequest, FastifyReply } from "fastify";
import logdown, { Logger } from "logdown";
import { Direction, getEntries } from "./NightscoutApi";
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
        icon: getDirectionIconId(latestEntry.direction),
      },
      {
        chartData: entries
          .map((entry) => roundGlucose(mgdlToMmoll(entry.sgv)))
          .reverse(),
      },
    ],
  };
};

function getDirectionIconId(direction: Direction, colorRed: boolean = false) {
  if (direction == "DoubleDown" || direction == "DOUBLE_DOWN")
    return colorRed ? "a30925" : "a30917";
  else if (direction == "SingleDown" || direction == "SINGLE_DOWN")
    return colorRed ? "i30923" : "i30915";
  else if (direction == "FortyFiveDown" || direction == "FORTY_FIVE_DOWN")
    return colorRed ? "i30919" : "i30911";
  else if (direction == "Flat" || direction == "FLAT")
    return colorRed ? "i30921" : "i30913";
  else if (direction == "FortyFiveUp" || direction == "FORTY_FIVE_UP")
    return colorRed ? "i30920" : "i30912";
  else if (direction == "SingleUp" || direction == "SINGLE_UP")
    return colorRed ? "i30922" : "i30914";
  else if (direction == "DoubleUp" || direction == "DOUBLE_UP")
    return colorRed ? "a30924" : "a30916";
  else if (direction == "NONE") return "i3769";
  else if (direction == "NOT COMPUTABLE") return "i3769";
  else return "i3769";
}
