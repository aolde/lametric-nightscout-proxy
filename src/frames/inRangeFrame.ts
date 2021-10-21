import { mgdlToMmoll, roundGlucose } from "../utils";
import { NightscoutEntry } from "../nightscoutApi/entries";
import { LaMetricFrame } from "../lametric/LaMetricFrame";

export const inRangeFrame = (entries: NightscoutEntry[]): LaMetricFrame => {
  const totalItems = entries.length;
  const inRangeItems = entries.filter(
    (e) => mgdlToMmoll(e.sgv) >= 3.9 && mgdlToMmoll(e.sgv) <= 10
  ).length;

  return {
    goalData: {
      start: 0,
      end: 100,
      current: (inRangeItems / totalItems) * 100,
      unit: "%",
    },
  };
};
