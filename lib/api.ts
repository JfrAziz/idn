import type { Feature, FeatureCollection, Geometry } from "geojson";

/**
 * GeoJSON data has the following properties
 */
export interface GeoJSONExtended extends FeatureCollection {
  features: Array<
    Feature<
      Geometry,
      {
        id: string;
        [name: string]: string;
      }
    >
  >;
}

/**
 * we only have 4 atm,
 */
export type DataSource =
  | "34-bps"
  | "38-bps"
  | "34-kemendagri"
  | "38-kemendagri";

/**
 * all API in this project has structure like this
 */

export interface GeoJSONSource {
  source: DataSource;
  province?: string;
  regency?: string;
  district?: string;
  village?: string;
}

export const getAPIURL = () =>
  import.meta.env.BASE_URL.replace(/\/+$/, "") + "/api";

/**
 * just a wrapper for fetch to get GeoJSON data
 *
 * @param endpoint
 * @returns
 */
export const geoJSONfetcher = (endpoint: string) =>
  fetch(endpoint).then((res) => res.json()) as Promise<GeoJSONExtended>;

/**
 * get hierarichal geojson URL, hiearichal geojson
 * will show all the child for current source, for example
 * when the source is the province, they will display all
 * regencies on it instead display the province full in one
 * features
 *
 * @param source
 * @returns
 */
export const getHierarichalGeoJSONURL = (source: GeoJSONSource): string => {
  let result = getAPIURL() + "/" + source.source;

  if (source.province)
    result = result + "/" + source.province.replaceAll("/", "");

  if (source.regency)
    result = result + "/" + source.regency.replaceAll("/", "");

  if (source.district)
    result = result + "/" + source.district.replaceAll("/", "");

  return result + ".json";
};
