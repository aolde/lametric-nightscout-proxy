import got from "got";
import { stringify } from "querystring";

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
  find: string | null = null,
  count: number | null = null
) => {
  const params = {
    token,
    find,
    count,
  };
  const response = await got.get<NightscoutEntry[]>(
    `${baseUrl}/api/v1/entries.json?${stringify(params)}`,
    { responseType: "json" }
  );

  if (response.statusCode !== 200) {
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
  direction: string;
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
