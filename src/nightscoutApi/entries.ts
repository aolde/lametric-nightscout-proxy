import got from "got";
import { stringify } from "querystring";
import logdown from "logdown";

const logger = logdown("nightscout");

/**
 * The Entries endpoint returns information about the Nightscout entries.
 * 
 * @param baseUrl Base part of Nightscout URL, e.g. "http://example.com"
 * @param token Access token (optional)
 * @param find The query used to find entries, support nested query syntax, for example find[dateString][$gte]=2015-08-27. All find parameters are interpreted as strings.
 * @param count Number of entries to return.

 * @returns Collection of entries matching query.
 */
export const getEntries = async (
  baseUrl: string,
  token: string | null = null,
  find: Record<string, string> | null = null,
  count: number | null = null
) => {
  const params = {
    token,
    count,
    ...find,
  };

  const response = await got.get<NightscoutEntry[]>(
    `${baseUrl}/api/v1/entries.json?${stringify(params)}`,
    { responseType: "json" }
  );

  if (response.statusCode !== 200) {
    logger.error("Could not fetch entries from Nightscout");
    throw new Error("Could not fetch entries from Nightscout");
  }

  return response.body;
};

export interface NightscoutEntry {
  _id: string;
  device: string;
  /** Epoch time */
  date: any;
  /** dateString, MUST be ISO 8601 format date parseable by Javascript Date() */
  dateString: Date;
  /** The glucose reading. (only available for sgv types) */
  sgv: number;
  /** Delta between previous and current value */
  delta: number;
  /** Direction of glucose trend reported by CGM. (only available for sgv types) */
  direction: Direction;
  /** sgv, mbg, cal, etc */
  type: string;
  /** The raw filtered value directly from CGM transmitter. (only available for sgv types) */
  filtered: number;
  /** The raw unfiltered value directly from CGM transmitter. (only available for sgv types) */
  unfiltered: number;
  /** The signal strength from CGM transmitter. (only available for sgv types) */
  rssi: number;
  /** Noise level at time of reading. (only available for sgv types) */
  noise: number;
  sysTime: Date;
  utcOffset: number;
  mills: any;
}

// Nightscout uses PascalCase and Sugarmate.io uses underscore casing.
export type Direction =
  | "DoubleDown"
  | "DOUBLE_DOWN"
  | "SingleDown"
  | "SINGLE_DOWN"
  | "FortyFiveDown"
  | "FORTY_FIVE_DOWN"
  | "Flat"
  | "FLAT"
  | "FortyFiveUp"
  | "FORTY_FIVE_UP"
  | "SingleUp"
  | "SINGLE_UP"
  | "DoubleUp"
  | "DOUBLE_UP"
  | "NOT COMPUTABLE"
  | "NONE";
