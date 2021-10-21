import { mgdlToMmoll, roundGlucose } from "../utils";
import { NightscoutEntry } from "../nightscoutApi/entries";

export const glucoseGraphFrame = (entries: NightscoutEntry[]) => {
  return {
    chartData: entries
      .map((entry) => roundGlucose(mgdlToMmoll(entry.sgv)))
      .slice(0, 10)
      .reverse(),
  };
};
