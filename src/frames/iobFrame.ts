import { LaMetricFrame } from "../lametric/LaMetricFrame";
import { FrameData } from "./FrameData";

export const iobFrame = (data: FrameData): LaMetricFrame => {
  return {
    text: data.properties.iob.displayLine,
  };
};
