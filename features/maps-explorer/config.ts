import type { BoundsLiteral } from "leaflet";

export const INDONESIA_BOUNDING_BOX: BoundsLiteral = [
  [6.0769403, 141.0194],
  [-11.0042095, 95.0111161],
];

export const BASEMAP = {
  url: "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};
