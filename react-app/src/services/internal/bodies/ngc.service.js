import { CelestialDatabase } from "./data/index";
import camelize from "camelize";
export const ngcRequest = () => {
  return new Promise((resolve, reject) => {
    const ngc = CelestialDatabase.ngc;
    if (!ngc) {
      reject("no ngc found");
    }
    resolve(ngc);
  });
};
export const ngcTransform = (fields = []) => {
  const mappedResults = fields.map((ngc) => {
    return {
      name: ngc.fields.name,
      declination: ngc.fields.dec,
      rightAscension: ngc.fields.ra,
      type: ngc.fields.catalog,
      description: ngc.fields.object_definition,
      ngcId: ngc.fields.name.replace("IC", ""),
      nakedEyeObject: false,
      aboveHorizon: false,
      created: false,
    };
  });
  return camelize(
    mappedResults.sort(function (a, b) {
      return a.ngcId - b.ngcId;
    })
  );
};
