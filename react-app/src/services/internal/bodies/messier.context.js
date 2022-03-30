import React, { useState, createContext, useEffect } from "react";
import { messierRequest, messierTransform } from "./messier.service";

export const MessierContext = createContext();
export const MessierContextProvider = ({ children }) => {
  const [messier, setMessier] = useState([]);
  const [messierIsLoading, setIsLoading] = useState(false);
  const [messierError, setError] = useState(null);

  const retrievePlanets = () => {
    setIsLoading(true);
    setMessier([]);
    setTimeout(() => {
      messierRequest()
        .then(messierTransform)
        .then((results) => {
          setIsLoading(false);
          setMessier(results);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }, 2000);
  };
  useEffect(() => {
    retrievePlanets();
  }, []);

  return (
    <MessierContext.Provider
      value={{ messier, messierIsLoading, messierError }}
    >
      {children}
    </MessierContext.Provider>
  );
};
