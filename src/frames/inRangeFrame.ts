import { LaMetricFrame } from "../lametric/LaMetricFrame";
import { FrameData } from "./FrameData";

export const inRangeFrame = (data: FrameData): LaMetricFrame => {
  const totalItems = data.entries.length;
  const inRangeItems = data.entries.filter(
    (e) =>
      data.convertGlucoseUnit(e.sgv) >= data.settings.lowTarget &&
      data.convertGlucoseUnit(e.sgv) <= data.settings.highTarget
  ).length;

  return {
    icon: "47199", // icon with white checkmark with a green background
    goalData: {
      start: 0,
      end: 100,
      current: Math.round((inRangeItems / totalItems) * 100),
      unit: "%",
    },
  };
};
