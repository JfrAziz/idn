import useSWR from "swr";
import chroma from "chroma-js";
import { GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import { useMapStore } from "@components/store";
import { INDONESIA_BOUNDING_BOX } from "./config";
import { FeatureGroup, useMap } from "react-leaflet";
import { geoJSONfetcher, getHierarichalGeoJSONURL } from "@lib/api";

export const GeoJSONLayer = () => {
  const map = useMap();

  const source = useMapStore((state) => state.source);

  const [color, setColor] = useState<string[]>([]);

  const { data } = useSWR(getHierarichalGeoJSONURL(source), geoJSONfetcher);

  useEffect(() => {
    const bounds = useMapStore.getState().geoJSONref?.getBounds();

    if (bounds && Object.keys(bounds).length !== 0) map.fitBounds(bounds);
    else map.fitBounds(INDONESIA_BOUNDING_BOX);

    if (data) setColor(chroma.scale("OrRd").colors(data.features.length));
  }, [data]);

  return (
    <FeatureGroup ref={(ref) => useMapStore.setState({ geoJSONref: ref })}>
      {data?.features.map((feature, idx) => (
        <GeoJSON
          data={feature}
          key={feature.properties.id}
          style={{
            opacity: 1,
            weight: 0.5,
            color: "black",
            dashArray: "0",
            fillColor: color[idx],
          }}
          onEachFeature={(f, l) =>
            l.on("click", () =>
              useMapStore.setState({
                source: { source: "34-bps", province: f.properties.province },
              })
            )
          }
        />
      ))}
    </FeatureGroup>
  );
};
