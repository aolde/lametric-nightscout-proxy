import { LaMetricFrame } from "../lametric/LaMetricFrame";
import { FrameData } from "./FrameData";

export const iobFrame = (data: FrameData): LaMetricFrame => {
  if (data.settings.hideIobFrameWhenEmpty && data.properties.iob.iob === 0) {
    return null;
  }

  return {
    text: data.properties.iob.displayLine,
  };
};
