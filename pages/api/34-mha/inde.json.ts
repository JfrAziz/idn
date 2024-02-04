import type { APIRoute } from "astro";
import data from "@data/indonesia-34-provinces.json";

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      ...data,
      features: data.features.map((f) => ({
        ...f,
        properties: {
          id: f.properties.province_mha_code,
          name: f.properties.province_mha_name,
          province: f.properties.province_mha_code,
          province_name: f.properties.province_mha_name,
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
