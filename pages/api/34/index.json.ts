import type { APIRoute } from "astro";
import data from "@data/indonesia-34-provinces.json";

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
};

export function getStaticPaths() {
  return [{  }];
}
