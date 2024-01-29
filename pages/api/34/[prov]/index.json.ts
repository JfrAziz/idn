import type { APIRoute } from "astro";
import data from "@data/indonesia-34-regencies.json";

export const GET: APIRoute = ({ params }) => {
  return new Response(
    JSON.stringify({
      ...data,
      name: "prov-" + params.prov,
      features: (data as any).features.filter(
        (f: any) => f.properties.prov_id === params.prov
      ),
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
    ...new Set((data as any).features.map((i: any) => i.properties.prov_id)),
  ].map((p) => ({ params: { prov: p } }));
}
