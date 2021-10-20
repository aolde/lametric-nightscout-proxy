import { Direction } from "./nightscoutApi/entries";

export const mgdlToMmoll = (mgdl: number) => {
  return mgdl / 18;
};

export const mmollToMgdl = (mmoll: number) => {
  return mmoll * 18;
};

export const roundGlucose = (value: number) => {
  return Math.round(value * 10) / 10;
};

export function getDirectionIconId(
  direction: Direction,
  colorRed: boolean = false
) {
  if (direction == "DoubleDown" || direction == "DOUBLE_DOWN")
    return colorRed ? "a30925" : "a30917";
  else if (direction == "SingleDown" || direction == "SINGLE_DOWN")
    return colorRed ? "i30923" : "i30915";
  else if (direction == "FortyFiveDown" || direction == "FORTY_FIVE_DOWN")
    return colorRed ? "i30919" : "i30911";
  else if (direction == "Flat" || direction == "FLAT")
    return colorRed ? "i30921" : "i30913";
  else if (direction == "FortyFiveUp" || direction == "FORTY_FIVE_UP")
    return colorRed ? "i30920" : "i30912";
  else if (direction == "SingleUp" || direction == "SINGLE_UP")
    return colorRed ? "i30922" : "i30914";
  else if (direction == "DoubleUp" || direction == "DOUBLE_UP")
    return colorRed ? "a30924" : "a30916";
  else if (direction == "NONE") return "i3769";
  else if (direction == "NOT COMPUTABLE") return "i3769";
  else return "i3769";
}
