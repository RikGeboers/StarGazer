import axios from "axios";
import { STARGAZER_IP_CONNECTION as baseURL } from "@env";
import Toast from "react-native-toast-message";
import * as FileSystem from "expo-file-system";
import IndexService from "./index.service";

async function GetPreview() {
  var fileName = `preview_${IndexService.GetFormattedTime()}.jpg`;
  return await FileSystem.downloadAsync(
    baseURL + "/getPreview",
    FileSystem.documentDirectory + fileName
  )
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function GetCameraSettings() {
  console.log(baseURL)
  return await axios
    .get(baseURL + "/getCameraConfigurableSettings")
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      if (error.response !== undefined) {
        console.log(error.response);
        Toast.show({
          type: "error",
          text1: `${error.response.data}`,
          text2: `Error code: ${error.response.status}`,
        });
      } else {
        Toast.show({
          type: "error",
          text1: `Failed fetching settings`,
        });
      }
      console.log(error);
    });
}

async function GetSavedSessions() {
  return await axios
    .get(baseURL + "/getSavedSessions")
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: `${error.response.data}`,
      });
    });
}

async function GetConfigSettingsChoices(setting) {
  return await axios
    .get(baseURL + "/getConfigSettingsChoices/" + setting)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return null;
    });
}

async function GetSelectedSessionPhotos(sessionName) {
  var fileName = `${sessionName}_photos.zip`;
  return await FileSystem.downloadAsync(
    baseURL + "/getSession/" + sessionName,
    FileSystem.documentDirectory + fileName
  )
    .then((response) => {
      console.log("downloaded");
      return response;
    })
    .catch(function (error) {
      console.log("in error");
    });
}

async function GetSessionImageCount(sessionName) {
  return await axios
    .get(baseURL + "/getSessionImageCount/" + sessionName)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: `${error.response.data}`,
      });
      console.log(error);
    });
}

async function PostCameraSetting(cameraSettings) {
  console.log("posting now...");
  return await axios
    .post(baseURL + "/postCameraSetting", cameraSettings)
    .then((response) => {
      console.log("got result" + response.status);
      return response.status;
      // let file = new File([response.data], 'image.png');
      // return file;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      Toast.show({
        type: "error",
        text1: `${error.response.data}`,
      });
      console.log(error);
    });
}

async function PostCreateVideoAction(videoLength) {
  let videoSettings = {
    videoLength: videoLength,
    captureSounds: false,
  };
  console.log("Creating video now...");
  return await axios
    .post(baseURL + "/postVideoAction", videoSettings)
    .then((response) => {
      console.log("got result" + response.status);
      return response.status;
    })
    .catch(function (error) {
      // handle error
      console.log(error.response.data);
      Toast.show({
        type: "error",
        text1: `${error.response.data}`,
      });
    });
}
async function PostSession(session) {
  console.log("Creating session now...");
  return await axios
    .post(baseURL + "/createSession", session)
    .then((response) => {
      console.log("got result" + response.status);
      return response.status;
    })
    .catch(function (error) {
      // handle error
      console.log(error.response.data);
      Toast.show({
        type: "error",
        text1: `${error.response.data}`,
      });
    });
}

async function GetCreatedVideo() {
  var fileName = `${IndexService.GetFormattedTime()}_movie.mjpg`;
  return await FileSystem.downloadAsync(
    baseURL + "/getCreatedVideo",
    FileSystem.documentDirectory + fileName
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
}

async function GetKillProcessesAction() {
  return await axios
    .get(baseURL + "/getKillgPhoto2ProcessAction")
    .then((response) => {
      console.log(response)
      return response;
    })
    .catch(function (error) {
      console.log("ERR:"+ error);
      return error;
      // Toast.show({
      //   type: "error",
      //   text1: `${error.response.data}`,
      // });
      // console.log(error);
    });
}

async function GetDeviceCurrentTime() {
  return await axios
    .get(baseURL + "/getCurrentTime")
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log("ERR:"+ error);
      return error;
      // Toast.show({
      //   type: "error",
      //   text1: `${error.response.data}`,
      // });
      // console.log(error);
    });
}

async function GetActiveSessions() {
  return await axios
    .get(baseURL + "/getActiveSessions")
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log("ERR:"+ error);
      return error;
    });
}

async function SetDeviceCurrentTime(time) {
  return await axios
    .post(baseURL + "/setCurrentTime",{currentTime: time})
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log("ERR:"+ error);
      return error;
      // Toast.show({
      //   type: "error",
      //   text1: `${error.response.data}`,
      // });
      // console.log(error);
    });
}

async function DeleteSessionFolder(sessionName) {
  return await axios
    .delete(baseURL + "/deleteSessionFolder/" + sessionName)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: `${error.response.data}`,
      });
      console.log(error);
    });
}

async function CancelSession(sessionName) {
  return await axios
    .delete(baseURL + "/cancelSession/" + sessionName)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: `${error.response.data}`,
      });
      console.log(error);
    });
}



const CameraService = {
  GetCameraSettings,
  GetConfigSettingsChoices,
  PostCameraSetting,
  GetPreview,
  GetSavedSessions,
  GetSelectedSessionPhotos,
  GetSessionImageCount,
  PostCreateVideoAction,
  PostSession,
  GetCreatedVideo,
  GetKillProcessesAction,
  GetDeviceCurrentTime,
  SetDeviceCurrentTime,
  DeleteSessionFolder,
  GetActiveSessions,
  CancelSession
  
};

export default CameraService;
