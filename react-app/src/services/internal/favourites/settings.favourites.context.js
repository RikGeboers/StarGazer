import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const SettingsFavouritesContext = createContext();
export const SettingsFavouritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const add = (setting) => {
    setFavourites([...favourites, setting]);
  };
  const remove = (setting) => {
    const newFavourites = favourites.filter(
      (p) => p !== setting
    );
    setFavourites(newFavourites);
  };
  useEffect(() => {
    loadFavourites();
  }, []);

  useEffect(() => {
    saveFavourites(favourites);
  }, [favourites]);

  const saveFavourites = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@settingFavourites", jsonValue);
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const loadFavourites = async () => {
    try {
      const value = await AsyncStorage.getItem("@settingFavourites");
      if (value !== null) {
        setFavourites(JSON.parse(value));
      }
    } catch (e) {
      console.log("error loading", e);
    }
  };
  return (
    <SettingsFavouritesContext.Provider
      value={{ favourites, addToFavourites: add, removeFromFavourites: remove }}
    >
      {children}
    </SettingsFavouritesContext.Provider>
  );
};
