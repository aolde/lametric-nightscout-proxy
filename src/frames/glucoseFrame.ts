import { getDirectionIconId, roundGlucose } from "../utils";
import { LaMetricFrame } from "../lametric/LaMetricFrame";
import { FrameData } from "./FrameData";

export const glucoseFrame = (data: FrameData): LaMetricFrame => {
  const latestEntry = data.entries[0];

  const glucose = roundGlucose(data.convertGlucoseUnit(latestEntry.sgv));
  const delta = roundGlucose(data.convertGlucoseUnit(latestEntry.delta));

  return {
    text: glucose + " " + (latestEntry.delta >= 0 ? "+" : "") + delta,
    icon: getDirectionIconId(latestEntry.direction),
  };
};
