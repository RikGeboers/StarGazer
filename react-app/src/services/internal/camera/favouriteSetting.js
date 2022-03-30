import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const FavouriteCameraContext = createContext();
export const FavouriteCameraContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const add = (setting) => {
    setFavourites([...favourites, setting]);
  };
  const remove = (setting) => {
    const newFavourites = favourites.filter((p) => p !== setting);
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
      await AsyncStorage.setItem("@favouriteCamera", jsonValue);
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const loadFavourites = async () => {
    try {
      const value = await AsyncStorage.getItem("@favouriteCamera");
      if (value !== null) {
        setFavourites(JSON.parse(value));
      }
    } catch (e) {
      console.log("error loading", e);
    }
  };
  return (
    <FavouriteCameraContext.Provider
      value={{ favourites, addToFavourites: add, removeFromFavourites: remove }}
    >
      {children}
    </FavouriteCameraContext.Provider>
  );
};
