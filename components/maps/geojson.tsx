import useSWR from "swr";
import { useEffect } from "react";
import { GeoJSON } from "react-leaflet";
import { useMapStore } from "@components/store";
import { INDONESIA_BOUNDING_BOX } from "./config";
import { FeatureGroup, useMap } from "react-leaflet";
import { geoJSONfetcher, getHierarichalGeoJSONURL } from "@lib/api";

export const GeoJSONLayer = () => {
  const map = useMap();

  const source = useMapStore((state) => state.source);

  const { data } = useSWR(
    getHierarichalGeoJSONURL(source),
    geoJSONfetcher
  );

  useEffect(() => {
    const bounds = useMapStore.getState().geoJSONref?.getBounds();

    if (bounds && Object.keys(bounds).length !== 0) map.fitBounds(bounds);
    else map.fitBounds(INDONESIA_BOUNDING_BOX);
  }, [data]);

  return (
    <FeatureGroup ref={(ref) => useMapStore.setState({ geoJSONref: ref })}>
      {data?.features.map((feature) => (
        <GeoJSON
          data={feature}
          key={feature.properties.id}
          style={{ opacity: 1, dashArray: "0" }}
          onEachFeature={(f, l) =>
            l.on("click", () => {
              useMapStore.setState({
                source: { source: "34-bps", province: f.properties.id },
              });
            })
          }
        />
      ))}
    </FeatureGroup>
  );
};
