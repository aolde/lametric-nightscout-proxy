import { getDirectionIconId, mgdlToMmoll, roundGlucose } from "../utils";
import { NightscoutEntry } from "../nightscoutApi/entries";
import { LaMetricFrame } from "../lametric/LaMetricFrame";

export const glucoseFrame = (entries: NightscoutEntry[]): LaMetricFrame => {
  const latestEntry = entries[0];

  const glucose = roundGlucose(mgdlToMmoll(latestEntry.sgv));
  const delta = roundGlucose(mgdlToMmoll(latestEntry.delta));

  return {
    text: glucose + " " + (latestEntry.delta >= 0 ? "+" : "") + delta,
    icon: getDirectionIconId(latestEntry.direction),
  };
};
