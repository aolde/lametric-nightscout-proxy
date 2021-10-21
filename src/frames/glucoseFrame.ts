import { getDirectionIconId, roundGlucose } from "../utils";
import { LaMetricFrame } from "../lametric/LaMetricFrame";
import { FrameData } from "./FrameData";

export const glucoseFrame = (data: FrameData): LaMetricFrame => {
  const latestEntry = data.entries[0];

  const glucose = roundGlucose(data.convertGlucoseUnit(latestEntry.sgv));
  const delta = roundGlucose(data.convertGlucoseUnit(latestEntry.delta));
  const separator = data.settings.unit === "mmol/L" ? " " : ""; // too tight to use space separator in mg/dL unit
  const warningColor =
    glucose < data.settings.lowTarget || glucose > data.settings.highTarget;

  return {
    text: glucose + separator + (delta >= 0 ? "+" : "") + delta,
    icon: getDirectionIconId(latestEntry.direction, warningColor),
  };
};
