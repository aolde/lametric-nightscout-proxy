import { mgdlToMmoll, roundGlucose } from "../utils";
import { NightscoutEntry } from "../nightscoutApi/entries";
import { LaMetricFrame } from "../lametric/LaMetricFrame";

export const glucoseGraphFrame = (
  entries: NightscoutEntry[]
): LaMetricFrame => {
  return {
    chartData: entries
      .map((entry) => roundGlucose(mgdlToMmoll(entry.sgv)))
      .slice(0, 10)
      .reverse(),
  };
};
