import { FastifyRequest, FastifyReply } from "fastify";
import logdown from "logdown";
import { getEntries } from "./nightscoutApi/entries";
import { getProperties } from "./nightscoutApi/properties";
import { glucoseGraphFrame } from "./frames/glucoseGraphFrame";
import { glucoseFrame } from "./frames/glucoseFrame";
import { iobFrame } from "./frames/iobFrame";
import { inRangeFrame } from "./frames/inRangeFrame";
import { FrameData } from "./frames/FrameData";
import { mgdlToMmoll } from "./utils";
import { glucoseTimeFrame } from "./frames/glucoseTimeFrame";

const logger = logdown("nightscoutHandler");

const frames = {
  "Glucose value": glucoseFrame,
  "Elapsed mins": glucoseTimeFrame,
  "Glucose graph": glucoseGraphFrame,
  IOB: iobFrame,
  "Target in range": inRangeFrame,
};
type Frames = keyof typeof frames | string;

type RawSettings = {
  nightscoutUrl: string;
  token: string;
  enabledFrames: string;
  lowTarget: string;
  highTarget: string;
  unit: "mmol/L" | "mg/dL";
};

export type Settings = {
  nightscoutUrl: string;
  token: string;
  enabledFrames: Frames[];
  lowTarget: number;
  highTarget: number;
  unit: "mmol/L" | "mg/dL";
};

const targetRange: Record<Settings["unit"], [low: string, high: string]> = {
  "mmol/L": ["3.9", "10"],
  "mg/dL": ["70", "180"],
};

export const nightscoutHandler = async function (
  request: FastifyRequest<{ Querystring: RawSettings }>
) {
  const rawSettings = request.query;
  const unit = rawSettings.unit ?? "mmol/L";
  const settings: Settings = {
    nightscoutUrl: rawSettings.nightscoutUrl,
    token: rawSettings.token,
    enabledFrames:
      (rawSettings.enabledFrames?.split(",") as Frames[]) ??
      Object.keys(frames),
    unit: unit,
    lowTarget: parseFloat(rawSettings.lowTarget || targetRange[unit][0]),
    highTarget: parseFloat(rawSettings.highTarget || targetRange[unit][1]),
  };

  if (!settings.nightscoutUrl) {
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
    settings.nightscoutUrl,
    settings.token,
    { "find[dateString][$gte]": dateToday },
    0
  );
  const properties = await getProperties(
    settings.nightscoutUrl,
    settings.token,
    ["iob", "delta"]
  );

  const frameData: FrameData = {
    properties,
    entries,
    settings,
    convertGlucoseUnit: (mgdl) => {
      if (settings.unit === "mmol/L") {
        return mgdlToMmoll(mgdl);
      }

      return mgdl;
    },
  };

  const renderedFrames = Object.entries(frames)
    .filter(([key]) => settings.enabledFrames.includes(key))
    .map(([_, frameFunc]) => frameFunc(frameData));

  return {
    frames: renderedFrames,
  };
};
