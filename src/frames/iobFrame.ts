import { NightscoutEntry } from "../nightscoutApi/entries";
import { NightscoutProperties } from "../nightscoutApi/properties";

export const iobFrame = (
  _: NightscoutEntry[],
  properties: NightscoutProperties
) => {
  return {
    text: properties.iob.displayLine,
  };
};
