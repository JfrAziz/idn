import "leaflet/dist/leaflet.css";
import { BASEMAP } from "./config";
import { GeoJSONLayer } from "./geojson";
import { MapContainer, TileLayer } from "react-leaflet";

export const Maps = () => (
  <div className="absolute inset-0 size-full">
    <div className="relative size-full overflow-hidden">
      <MapContainer
        zoom={13}
        dragging={false}
        zoomControl={false}
        className="size-full"
        doubleClickZoom={false}
        scrollWheelZoom={false}
      >
        <GeoJSONLayer />
        <TileLayer {...BASEMAP} />
      </MapContainer>
    </div>
  </div>
);
