import { FastifyRequest, FastifyReply } from "fastify";
import logdown from "logdown";
import { getEntries } from "./nightscoutApi/entries";
import { getProperties } from "./nightscoutApi/properties";
import { glucoseGraphFrame } from "./frames/glucoseGraphFrame";
import { glucoseFrame } from "./frames/glucoseFrame";
import { iobFrame } from "./frames/iobFrame";

const logger = logdown("nightscoutHandler");

const frames = {
  "Glucose value": glucoseFrame,
  "Glucose graph": glucoseGraphFrame,
  IOB: iobFrame,
  // "% In Range": inRangeFrame,
};
type Frames = keyof typeof frames | string;

export const nightscoutHandler = async function (
  request: FastifyRequest,
  reply: FastifyReply
) {
  const nsUrl = (request.query as any).nightscoutUrl;
  let enabledFrames = (request.query as any).enabledFrames?.split(
    ","
  ) as Frames[];

  if (!enabledFrames) {
    enabledFrames = ["Glucose value", "Glucose graph", "IOB"];
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

  const entries = await getEntries(nsUrl);
  const properties = await getProperties(nsUrl, null, ["iob"]);

  const renderedFrames = Object.entries(frames)
    .filter(([key]) => enabledFrames.includes(key))
    .map(([_, frameFunc]) => frameFunc(entries, properties));

  return {
    frames: renderedFrames,
  };
};
