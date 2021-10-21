import { NightscoutEntry } from "../nightscoutApi/entries";
import { NightscoutProperties } from "../nightscoutApi/properties";
import { Settings } from "../nightscoutHandler";

export type FrameData = {
  entries: NightscoutEntry[];
  properties: NightscoutProperties;
  settings: Settings;
  convertGlucoseUnit: (glucoseValue: number) => number;
};
