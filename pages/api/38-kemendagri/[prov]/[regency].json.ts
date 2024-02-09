import { getDistrict, getDistrirctGeoJSON } from "@lib/data";

export const GET = ({ params }: { params: Record<string, string> }) => {
  return new Response(
    JSON.stringify(getDistrirctGeoJSON(params.prov, params.regency)),
    { headers: { "Content-Type": "application/json" } }
  );
};

/**
 * get static prov path
 *
 * @returns
 */
export function getStaticPaths() {
  return getDistrict().map((p) => ({ params: p }));
}
