import { mgdlToMmoll, roundGlucose } from "../utils";
import { NightscoutEntry } from "../nightscoutApi/entries";
import { NightscoutProperties } from "../nightscoutApi/properties";

export const glucoseGraphFrame = (
  entries: NightscoutEntry[],
  properties: NightscoutProperties
) => {
  return {
    chartData: entries
      .map((entry) => roundGlucose(mgdlToMmoll(entry.sgv)))
      .reverse(),
  };
};
