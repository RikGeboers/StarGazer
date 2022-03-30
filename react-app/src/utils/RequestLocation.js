import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";

export const RequestLocation = () => {
  const [, setLocationServiceEnabled] = useState(false);
  const [{ longitude, latitude, altitude }, setDisplayCurrentCoordinates] =
    useState({ longitude: 4.24, latitude: 51.12, altitude: 0.0 });
  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);
  const GetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service, So we can calculate your coordinates for the telescope.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }

    let { coords } = await Location.getCurrentPositionAsync();

    setDisplayCurrentCoordinates(coords);
  };
  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "Location Service not enabled",
        "Allow the app to use location service, So we can calculate your coordinates for the telescope.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };
  useEffect(() => {}, [altitude, latitude, longitude]);

  return { longitude, latitude, altitude };
  // <>
  //   <HomeLocation
  //     latitude={latitude}
  //     longitude={longitude}
  //     altitude={altitude}
  //   />
  // </>
};
