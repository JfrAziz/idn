import { GeoJSONExtended } from "./api";
import data from "@data/indonesia-38-district.json";

export const getDistrirctGeoJSON = (prov: string, regency: string) => {
  return {
    ...data,
    features: (data as unknown as GeoJSONExtended).features
      .filter(
        (f) =>
          f.properties.province_kemendagri_code === prov &&
          f.properties.regency_kemendagri_code === regency
      )
      .map((f) => ({
        ...f,
        properties: {
          id: f.properties.fullcode_kemendagri,
          name: f.properties.regency_kemendagri_name,
          province: f.properties.province_kemendagri_code,
          province_name: f.properties.province_kemendagri_name,
          regency: f.properties.regency_kemendagri_code,
          regency_name: f.properties.regency_kemendagri_name,
          district: f.properties.district_kemendagri_code,
          district_name: f.properties.district_kemendagri_name,
        },
      })),
  };
};

export const getDistrict = () => {
  return [
    ...new Set(
      (data as unknown as GeoJSONExtended).features.map(
        (i) =>
          `${i.properties.province_kemendagri_code}${i.properties.regency_kemendagri_code}`
      )
    ),
  ].map((p) => ({ prov: p.substring(0, 2), regency: p.substring(2, 4) }));
};
