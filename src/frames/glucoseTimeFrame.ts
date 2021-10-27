import { LaMetricFrame } from "../lametric/LaMetricFrame";
import { FrameData } from "./FrameData";

const SENSOR_VALUE_INTERVAL_MINS = 5;

export const glucoseTimeFrame = (data: FrameData): LaMetricFrame => {
  const latestEntryDate = new Date(data.properties.delta.times.recent);
  const nowDate = new Date();
  const diffMs = nowDate.getTime() - latestEntryDate.getTime();
  const elapsedMinutes = Math.round(diffMs / 60000);

  if (
    data.settings.hideTimeFrameWhenInRange &&
    elapsedMinutes <= SENSOR_VALUE_INTERVAL_MINS
  ) {
    return null;
  }

  return {
    text: elapsedMinutes + " min",
    icon: "1609",
  };
};
