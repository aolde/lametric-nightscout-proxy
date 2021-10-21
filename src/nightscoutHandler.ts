import { FastifyRequest, FastifyReply } from "fastify";
import logdown from "logdown";
import { getEntries } from "./nightscoutApi/entries";
import { getProperties } from "./nightscoutApi/properties";
import { glucoseGraphFrame } from "./frames/glucoseGraphFrame";
import { glucoseFrame } from "./frames/glucoseFrame";
import { iobFrame } from "./frames/iobFrame";
import { inRangeFrame } from "./frames/inRangeFrame";

const logger = logdown("nightscoutHandler");

const frames = {
  "Glucose value": glucoseFrame,
  "Glucose graph": glucoseGraphFrame,
  IOB: iobFrame,
  "Target in range": inRangeFrame,
};
type Frames = keyof typeof frames | string;

type Settings = {
  nightscoutUrl: string;
  enabledFrames: string;
};

export const nightscoutHandler = async function (
  request: FastifyRequest<{ Querystring: Settings }>,
  reply: FastifyReply
) {
  const settings = request.query;
  const nsUrl = settings.nightscoutUrl;
  let enabledFrames = settings.enabledFrames?.split(",") as Frames[];

  if (!enabledFrames) {
    enabledFrames = [
      "Glucose value",
      "Glucose graph",
      "IOB",
      "Target in range",
    ];
  }

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

  const dateToday = new Date().toISOString().substring(0, 10); // format 2000-01-01
  const entries = await getEntries(
    nsUrl,
    null,
    { "find[dateString][$gte]": dateToday },
    0
  );
  const properties = await getProperties(nsUrl, null, ["iob"]);

  const renderedFrames = Object.entries(frames)
    .filter(([key]) => enabledFrames.includes(key))
    .map(([_, frameFunc]) => frameFunc(entries, properties));

  return {
    frames: renderedFrames,
  };
};
