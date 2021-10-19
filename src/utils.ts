export const mgdlToMmoll = (mgdl: number) => {
  return mgdl / 18;
};

export const mmollToMgdl = (mmoll: number) => {
  return mmoll * 18;
};

export const roundGlucose = (value: number) => {
  return Math.round(value * 10) / 10;
};
