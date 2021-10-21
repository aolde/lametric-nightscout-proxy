import { roundGlucose } from "../utils";
import { LaMetricFrame } from "../lametric/LaMetricFrame";
import { FrameData } from "./FrameData";

export const glucoseGraphFrame = (data: FrameData): LaMetricFrame => {
  return {
    chartData: data.entries
      .map((entry) => roundGlucose(data.convertGlucoseUnit(entry.sgv)))
      .slice(0, 10)
      .reverse(),
  };
};
