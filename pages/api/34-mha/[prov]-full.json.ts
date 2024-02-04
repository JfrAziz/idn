import type { APIRoute } from "astro";
import type { GeoJSONExtended } from "@lib/api";
import data from "@data/indonesia-34-provinces.json";

export const GET: APIRoute = ({ params }) => {
  return new Response(
    JSON.stringify({
      ...data,
      name: "prov-" + params.prov,
      features: (data as unknown as GeoJSONExtended).features
        .filter((f) => f.properties.province_mha_code === params.prov)
        .map((f) => ({
          ...f,
          properties: {
            id: f.properties.province_mha_code,
            name: f.properties.province_mha_name,
            province: f.properties.province_mha_code,
            province_name: f.properties.province_mha_name,
          },
        })),
    }),
    { headers: { "Content-Type": "application/json" } }
  );
};

/**
 * get static prov path
 *
 * @returns
 */
export function getStaticPaths() {
  return [
    ...new Set(
      (data as unknown as GeoJSONExtended).features.map(
        (i) => i.properties.province_mha_code
      )
    ),
  ].map((p) => ({ params: { prov: p } }));
}
