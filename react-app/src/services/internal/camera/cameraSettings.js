import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const CameraSettingsContext = createContext();
export const CameraSettingsContextProvider = ({ children }) => {
  const [cameraSettings, setCameraSettings] = useState([]);
  const replace = (settings) => {
    setCameraSettings(settings);
  };

  useEffect(() => {
    loadCameraSettings();
  }, []);

  useEffect(() => {
    saveCameraSettings(cameraSettings);
  }, [cameraSettings]);

  const saveCameraSettings = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@cameraSettings", jsonValue);
    } catch (e) {
      console.log("error storing", e);
    }
  };

  const loadCameraSettings = async () => {
    try {
      const value = await AsyncStorage.getItem("@cameraSettings");
      if (value !== null) {
        setCameraSettings(JSON.parse(value));
      }
    } catch (e) {
      console.log("error loading", e);
    }
  };
  return (
    <CameraSettingsContext.Provider
      value={{
        cameraSavedSettings: cameraSettings,
        replaceSetting: replace,
      }}
    >
      {children}
    </CameraSettingsContext.Provider>
  );
};
