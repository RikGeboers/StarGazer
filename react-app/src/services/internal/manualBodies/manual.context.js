import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const ManualContext = createContext();
export const ManualContextProvider = ({ children }) => {
  const [manuals, setManuals] = useState([]);
  const add = (celestialBody) => {
    setManuals([...manuals, celestialBody]);
  };
  const remove = (celestialBody) => {
    const newManual = manuals.filter((p) => p.name !== celestialBody.name);
    setManuals(newManual);
  };
  useEffect(() => {
    loadManuals();
  }, []);

  useEffect(() => {
    saveManuals(manuals);
  }, [manuals]);

  const saveManuals = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@manuals", jsonValue);
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const loadManuals = async () => {
    try {
      const value = await AsyncStorage.getItem("@manuals");
      if (value !== null) {
        setManuals(JSON.parse(value));
      }
    } catch (e) {
      console.log("error loading", e);
    }
  };
  return (
    <ManualContext.Provider
      value={{ manuals, addToManuals: add, removeFromManuals: remove }}
    >
      {children}
    </ManualContext.Provider>
  );
};
