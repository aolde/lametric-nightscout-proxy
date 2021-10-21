import { LaMetricFrame } from "../lametric/LaMetricFrame";
import { FrameData } from "./FrameData";

export const glucoseTimeFrame = (data: FrameData): LaMetricFrame => {
  return {
    text: data.properties.delta.elapsedMins + " min",
    icon: "1609",
  };
};
