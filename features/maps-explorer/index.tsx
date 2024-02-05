import "leaflet/dist/leaflet.css";
import { BASEMAP } from "./config";
import { GeoJSONLayer } from "./geojson";
import { MapContainer, TileLayer } from "react-leaflet";

import { Header } from "./header";

export const MapExplorer = () => (
  <div className="relative h-svh max-h-svh flex flex-col">
    <Header />
    <div className="flex-1 relative w-full">
      <div className="absolute inset-0 size-full z-0">
        <div className="relative size-full overflow-hidden">
          <MapContainer
            zoom={13}
            dragging={false}
            touchZoom={false}
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
    </div>
  </div>
);
