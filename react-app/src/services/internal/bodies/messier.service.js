import { CelestialDatabase } from "./data/index";
import camelize from "camelize";
export const messierRequest = () => {
  return new Promise((resolve, reject) => {
    const messier = CelestialDatabase.messier;
    if (!messier) {
      reject("no messier found");
    }
    resolve(messier);
  });
};
export const messierTransform = (fields = []) => {
  const mappedResults = fields.map((messier) => {
    return {
      name: messier.fields.messier,
      declination: messier.fields.dec,
      type: "MESSIER",
      description: messier.fields.english_name_nom_en_anglais,
      rightAscension: messier.fields.ra,
      messierId: messier.fields.messier.replace("M", ""),
      nakedEyeObject: false,
      aboveHorizon: false,
      created: false,
    };
  });

  return camelize(
    mappedResults.sort(function (a, b) {
      return a.messierId - b.messierId;
    })
  );
};
