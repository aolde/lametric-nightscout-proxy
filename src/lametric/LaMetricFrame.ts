/** https://help.lametric.com/support/solutions/articles/6000225467-my-data-diy */
export type LaMetricFrame = {
  /** Text that will be displayed. If it is too long – it will scroll */
  text?: string;
  /**
   * (optional).
   * can be an ID of an icon (go to https://developer.lametric.com/icons to browse for icons and know their IDs)
   * can be a base64 encoded binary data of an 8x8 icon in the following format:
   * "data:image/png;base64,<base64 encoded png binary>" for PNG image or
   * "data:image/gif;base64,<base64 encoded  binary>" for animated GIF image.
   */
  icon?: string;
  /** (optional) Specifies how long a "frame" will be displayed on the screen before proceeding to the next one. Works only with frames that do not scroll. */
  duration?: number;
  /** (optional) Describes frame with the progress indicator. Useful to visualize some kind of goals. */
  goalData?: LaMetricGoalData;
  /** (optional) Describes spike chart. Useful to visualize how data changes over time. Chart will be scaled automatically. */
  chartData?: number[];
};

export type LaMetricGoalData = {
  /** The start value */
  start: number;
  /** The current value */
  current: number;
  /** The goal value */
  end: number;
  unit: string;
};
