/*eslint-disable*/
import axios from "axios";
import Toast from "react-native-toast-message";
import { STARGAZER_IP_CONNECTION as baseURL } from "@env";
async function Align(rightAscension, declination, type) {
  let hours, minutes, seconds, degrees, arcminutes, arcseconds;

  if (type !== "PLANET") {
    const ra = rightAscension.split(":");
    const dec = declination.split(":");
    hours = ra[0];
    minutes = ra[1];
    seconds = ra[2];
    degrees = dec[0];
    arcminutes = dec[1];
    arcseconds = dec[2];
  } else {
    hours = rightAscension.hours;
    minutes = rightAscension.minutes;
    seconds = rightAscension.seconds;
    degrees = declination.degrees;
    arcminutes = declination.arcminutes;
    arcseconds = declination.arcseconds;
  }
  console.log(hours, minutes, seconds, degrees, arcminutes, arcseconds);
  return await axios
    .post(baseURL + "/postCoordinates", null, {
      params: {
        raHours: hours,
        raMinutes: minutes,
        raSeconds: seconds,
        decDegrees: degrees,
        decMinutes: arcminutes,
        decSeconds: arcseconds,
      },
    })
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
}

async function Move(direction, trackRate) {
  return await axios.post(baseURL + "/move", null, {
    params: {
      direction: direction,
      trackRate: trackRate,
    },
  });
}

async function getTelescopes() {
  return await axios
    .get(baseURL + "/getTelescopes")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      Toast.show({
        type: "error",
        text1: `${error.message}`,
      });
    }
  );
}

async function getCurrentTelescope() {
  return await axios
    .get(baseURL + "/getCurrentTelescope")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      Toast.show({
        type: "error",
        text1: `${error.message}`,
      });
    });
}

async function setTelescope(name) {
  return await axios.post(baseURL + "/setTelescope", null, {
    params: {
      name: name,
    },
  });
}

const TelescopeService = {
  Align,
  Move,
  getTelescopes,
  getCurrentTelescope,
  setTelescope,
};

export default TelescopeService;
