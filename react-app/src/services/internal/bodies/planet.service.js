import planets from "./data/planets.json";
import camelize from "camelize";
import React, { useEffect, useState } from "react";
import { GeneratePlanetData } from "../../../calculations/planets";
import { RequestLocation } from "../../../utils/RequestLocation";

export const planetsRequest = () => {
  return new Promise((resolve, reject) => {
    const planet = planets;

    if (!planet) {
      reject("not found");
    }
    resolve(planet);
  });
};
export const planetTransform = (planets) => {
  const mappedResults = planets.map((planet, id) => {
    return {
      ...planet,
      type: "PLANET",
      planetId: id,
      description: "Sol System",
      created: false,
    };
  });
  return camelize(mappedResults);
};
