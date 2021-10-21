import { LaMetricFrame } from "../lametric/LaMetricFrame";
import { NightscoutEntry } from "../nightscoutApi/entries";
import { NightscoutProperties } from "../nightscoutApi/properties";

export const iobFrame = (
  _: NightscoutEntry[],
  properties: NightscoutProperties
): LaMetricFrame => {
  return {
    text: properties.iob.displayLine,
  };
};
