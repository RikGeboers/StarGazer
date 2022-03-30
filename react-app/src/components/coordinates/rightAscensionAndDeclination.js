import { Text } from "../typography/text";
import React from "react";
export const RightAscension = (rightAscension) => {
  let hours, minutes, seconds;
  if (typeof rightAscension === "object") {
    hours = rightAscension.hours;
    minutes = rightAscension.minutes;
    seconds = rightAscension.seconds;
  } else {
    hours = rightAscension.split(":")[0];
    minutes = rightAscension.split(":")[1];
    seconds = rightAscension.split(":")[2];
  }
  return (
    <Text variant="label">
      {hours}h{minutes}m{seconds}s
    </Text>
  );
};
export const Declination = (declination) => {
  let degrees, arcminutes, arcseconds;
  if (typeof declination === "object") {
    degrees = declination.degrees;
    arcminutes = declination.arcminutes;
    arcseconds = declination.arcseconds;
  } else {
    degrees = declination.split(":")[0];
    arcminutes = declination.split(":")[1];
    arcseconds = declination.split(":")[2];
  }

  return (
    <Text variant="label">
      {degrees}°{arcminutes}'{arcseconds}"
    </Text>
  );
};
