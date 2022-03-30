import React, { useState, createContext, useEffect } from "react";
import { GeneratePlanetData } from "../../../calculations/planets";
import { RequestLocation } from "../../../utils/RequestLocation";
import { planetTransform, planetsRequest } from "./planet.service";

export const PlanetContext = createContext();
export const PlanetContextProvider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [plan, setPlan] = useState([]);
  const [planetIsLoading, setIsLoading] = useState(false);
  const [planetError, setError] = useState(null);
  const { longitude, latitude, altitude } = RequestLocation();
  useEffect(() => {
    makePlanets();
  }, [longitude, latitude, altitude]);
  function makePlanets() {
    const plans = GeneratePlanetData(latitude, longitude, altitude);

    const transformed = planetTransform(plans);
    setPlanets(transformed);
  }
  const retrievePlanets = () => {
    setIsLoading(true);
    setPlanets([]);
    const plans = GeneratePlanetData(latitude, longitude, altitude);

    const transformed = planetTransform(plans);
    setPlanets(transformed);
    setIsLoading(false);
    // setIsLoading(true);
    // setPlanets([]);
    // setTimeout(() => {
    //   planetsRequest()
    //     // .then(planetTransform)
    //     .then((results) => {
    //       setIsLoading(false);
    //       setPlanets(results);
    //     })
    //     .catch((err) => {
    //       setIsLoading(false);
    //       setError(err);
    //     });
    // }, 2000);
  };
  useEffect(() => {
    retrievePlanets();
  }, []);

  return (
    <PlanetContext.Provider value={{ planets, planetIsLoading, planetError }}>
      {children}
    </PlanetContext.Provider>
  );
};
