import { create } from "zustand";
import type { FeatureGroup } from "leaflet";
import type { GeoJSONSource } from "@lib/api";

interface MapState {
  source: GeoJSONSource;
  geoJSONref: FeatureGroup | null;
}

export const useMapStore = create<MapState>()(() => ({
  geoJSONref: null,
  source: { source: "34-bps" },
}));
