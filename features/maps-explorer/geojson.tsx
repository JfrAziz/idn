import chroma from "chroma-js";
import { useMapStore } from "./store";
import { GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { INDONESIA_BOUNDING_BOX } from "./config";
import { useWindowSize } from "@uidotdev/usehooks";
import { FeatureGroup, useMap } from "react-leaflet";
import { geoJSONfetcher, getHierarchicalGeoJSONURL } from "@lib/api";

export const GeoJSONLayer = () => {
  const map = useMap();

  const size = useWindowSize();

  const source = useMapStore((state) => state.source);

  const [color, setColor] = useState<string[]>([]);

  const { data } = useSWRImmutable(
    getHierarchicalGeoJSONURL(source),
    geoJSONfetcher
  );

  useEffect(() => {
    const bounds = useMapStore.getState().geoJSONref?.getBounds();

    if (bounds && Object.keys(bounds).length !== 0) map.fitBounds(bounds);
    else map.fitBounds(INDONESIA_BOUNDING_BOX);

    if (data) setColor(chroma.scale("OrRd").colors(data.features.length));
  }, [data, size]);

  return (
    <FeatureGroup ref={(ref) => useMapStore.setState({ geoJSONref: ref })}>
      {data?.features.map((feature, idx) => (
        <GeoJSON
          data={feature}
          key={source.source + feature.properties.id}
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
                source: {
                  source: source.source,
                  province: f.properties.province,
                  regency: f.properties.regency,
                  district: f.properties.district,
                  village: f.properties.village,
                },
              })
            )
          }
        />
      ))}
    </FeatureGroup>
  );
};
