import got from "got";
import { stringify } from "querystring";

export const getProperties = async (
  baseUrl: string,
  token: string | null = null,
  properties: string[] = ["iob", "cob", "delta", "basal", "bwp"]
) => {
  const params = {
    token,
  };

  const response = await got.get<NightscoutProperties>(
    `${baseUrl}/api/v2/properties/${properties.join(",")}?${stringify(params)}`,
    { responseType: "json" }
  );

  if (response.statusCode !== 200) {
    throw new Error("Could not fetch properties from Nightscout");
  }

  return response.body;
};

export interface Treatment {
  timestamp: number;
  eventType: string;
  enteredBy: string;
  uuid: string;
  insulin: number;
  insulinInjections: string;
  created_at: Date;
  sysTime: Date;
  _id: string;
  utcOffset: number;
  mills: number;
  mgdl: number;
}

export interface Iob {
  iob: number;
  activity: number;
  lastBolus: Treatment;
  source: string;
  display: string;
  displayLine: string;
}

export interface TreatmentCOB {
  decayedBy: Date;
  isDecaying: number;
  carbs_hr: number;
  rawCarbImpact: number;
  cob: number;
  lastCarbs: Treatment;
}

export interface Cob {
  decayedBy: Date;
  isDecaying: number;
  carbs_hr: number;
  rawCarbImpact: number;
  cob: number;
  lastCarbs: Treatment;
  source: string;
  treatmentCOB: TreatmentCOB;
  display: number;
  displayLine: string;
}

export interface Times {
  recent: number;
  previous: number;
}

export interface Sgv {
  _id: string;
  mgdl: number;
  mills: number;
  device: string;
  direction: string;
  filtered: number;
  unfiltered: number;
  noise: number;
  rssi: number;
  type: string;
  scaled: string;
}

export interface Previous {
  mean: number;
  last: number;
  mills: number;
  sgvs: Sgv[];
}

export interface Delta {
  absolute: number;
  elapsedMins: number;
  interpolated: boolean;
  mean5MinsAgo: number;
  times: Times;
  mgdl: number;
  scaled: number;
  display: string;
  previous: Previous;
}

export interface Current {
  basal: number;
  treatment?: any;
  combobolustreatment?: any;
  tempbasal: number;
  combobolusbasal: number;
  totalbasal: number;
}

export interface Basal {
  display: string;
  current: Current;
}

export interface Bwp {
  effect: number;
  outcome: number;
  bolusEstimate: number;
  scaledSGV: number;
  iob: number;
  belowLowTarget: boolean;
  bolusEstimateDisplay: string;
  outcomeDisplay: number;
  displayIOB: string;
  effectDisplay: number;
  displayLine: string;
}

export interface NightscoutProperties {
  iob: Iob;
  cob: Cob;
  delta: Delta;
  basal: Basal;
  bwp: Bwp;
}
