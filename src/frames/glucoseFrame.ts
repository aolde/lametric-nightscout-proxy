import { getDirectionIconId, mgdlToMmoll, roundGlucose } from "../utils";
import { NightscoutEntry } from "../nightscoutApi/entries";

export const glucoseFrame = (entries: NightscoutEntry[]) => {
  const latestEntry = entries[0];

  const glucose = roundGlucose(mgdlToMmoll(latestEntry.sgv));
  const delta = roundGlucose(mgdlToMmoll(latestEntry.delta));

  return {
    text: glucose + " " + (latestEntry.delta > 0 ? "+" : "") + delta,
    icon: getDirectionIconId(latestEntry.direction),
  };
};
