import type { APIRoute } from "astro";
import type { GeoJSONExtended } from "@lib/api";
import data from "@data/indonesia-34-provinces.json";

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      ...data,
      features: (data as unknown as GeoJSONExtended).features.map((f) => ({
        ...f,
        properties: {
          id: f.properties.province_kemendagri_code,
          name: f.properties.province_kemendagri_name,
          province: f.properties.province_kemendagri_code,
          province_name: f.properties.province_kemendagri_name,
        },
      })),
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export function getStaticPaths() {
  return [{}];
}
