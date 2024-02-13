import fs from "fs";

const data = JSON.parse(
  fs.readFileSync("./data/indonesia-38-district.json", "utf-8")
);

const getDistrictParent = () => {
  return [
    ...new Set(
      data.features.map(
        (i) =>
          `${i.properties.province_kemendagri_code}${i.properties.regency_kemendagri_code}`
      )
    ),
  ].map((p) => ({ prov: p.substring(0, 2), regency: p.substring(2, 4) }));
};

const processDistrict = (prov, regency) => {
  const districtGeoJSON = {
    ...data,
    features: data.features
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

  fs.writeFileSync(
    `./dist/api/38-kemendagri/${prov}/${regency}.json`,
    JSON.stringify(districtGeoJSON)
  );

  console.log(`./dist/api/38-kemendagri/${prov}/${regency}.json created`);

  const path = `./dist/api/38-kemendagri/${prov}/${regency}`;

  if (!folderExists(path)) {
    try {
      fs.mkdirSync(path);
    } catch (err) {
      console.error("error creating folder:", err);
    }
  }

  for (const r of districtGeoJSON.features) {
    const villageData = JSON.parse(
      fs.readFileSync(`./data/villages-38/${prov}.geojson`, "utf-8")
    );

    const villageGeoJSON = {
      ...villageData,
      features: villageData.features
        .filter(
          (f) =>
            f.properties.kemendagri_kode_wilayah.substring(0, 2) === prov &&
            f.properties.kemendagri_kode_wilayah.substring(2, 4) === regency &&
            f.properties.kemendagri_kode_wilayah.substring(4, 6) ===
              r.properties.district
        )
        .map((f) => {
          const provinceCode = f.properties.kemendagri_kode_wilayah.substring(
            0,
            2
          );
          const regencyCode = f.properties.kemendagri_kode_wilayah.substring(
            2,
            4
          );
          const districtCode = f.properties.kemendagri_kode_wilayah.substring(
            4,
            6
          );
          const villageCode = f.properties.kemendagri_kode_wilayah.substring(
            6,
            10
          );

          return {
            ...f,
            properties: {
              id: `${provinceCode}.${regencyCode}.${districtCode}.${villageCode}`,
              name: f.properties.kemendagri_nama_wilayah,
              province: provinceCode,
              province_name: f.properties.kemendagri_nama_provinsi,
              regency: regencyCode,
              regency_name: f.properties.kemendagri_nama_kabupaten,
              district: districtCode,
              district_name: f.properties.kemendagri_nama_kecamatan,
              village: villageCode,
              village_name: f.properties.kemendagri_nama_wilayah,
            },
          };
        }),
    };

    fs.writeFileSync(
      `./dist/api/38-kemendagri/${prov}/${regency}/${r.properties.district}.json`,
      JSON.stringify(villageGeoJSON)
    );

    console.log(
      `/api/38-kemendagri/${prov}/${regency}/${r.properties.district}.json created`
    );
  }
};

// Function to check if a folder exists
const folderExists = (folderPath) => {
  try {
    fs.accessSync(folderPath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

const parent = getDistrictParent();

for (const p of parent) {
  const path = `./dist/api/38-kemendagri/${p.prov}`;

  if (!folderExists(path)) {
    try {
      fs.mkdirSync(path);
    } catch (err) {
      console.error("Error creating folder:", err);
      continue;
    }
  }

  processDistrict(p.prov, p.regency);
}

console.log(getDistrictParent());
