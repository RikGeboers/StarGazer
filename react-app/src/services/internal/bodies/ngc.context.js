import React, { useState, createContext, useEffect } from "react";
import { ngcRequest, ngcTransform } from "./ngc.service";

export const NgcContext = createContext();
export const NgcContextProvider = ({ children }) => {
  const [ngc, setNgc] = useState([]);
  const [ngcIsLoading, setIsLoading] = useState(false);
  const [ngcError, setError] = useState(null);

  const retrieveNgc = () => {
    setIsLoading(true);
    setNgc([]);
    setTimeout(() => {
      ngcRequest()
        .then(ngcTransform)
        .then((results) => {
          setIsLoading(false);
          setNgc(results);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }, 2000);
  };
  useEffect(() => {
    retrieveNgc();
  }, []);

  return (
    <NgcContext.Provider value={{ ngc, ngcIsLoading, ngcError }}>
      {children}
    </NgcContext.Provider>
  );
};
