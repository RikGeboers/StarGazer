const bash = require("../commands/bashCommands")
const functions = require("../dataProcessor/dataFunctions");


async function takePhotoAndDownloadPicture(photoInfo){
  return await bash.executeCommand(`gphoto2 --capture-image-and-download --filename images/photos/${fileName}`)
}

async function takeSessionPhoto(sessionName){
  return await bash.executeCommand(`gphoto2 --capture-image-and-download --filename images/sessions/${sessionName}/${functions.getFormattedTime()}.jpg`);
}


async function checkCameraConfigurableSettings(){
  return await bash.executeCommand(`gphoto2 --list-config`);
}

async function checkConfigSettingsChoices(setting){
  return await bash.executeCommand(`gphoto2 --get-config ${setting}`);
}

async function createTimeLaps(timelapsSettings){
  await bash.executeCommand(`mkdir -p ${timelapsSettings.folderName}`)
  return await bash.executeCommandWithLiveUpdate(`gphoto2 -I ${timelapsSettings.interval} -F ${timelapsSettings.snapShotCount} --capture-image-and-download --filename TimeLapses/${timelapsSettings.folderName}/%Y%m%d%H%M%S.jpg`)
}

async function setCameraSetting(cameraSetting){
  return await bash.executeCommand(`gphoto2 --set-config-index ${cameraSetting.setting}=${cameraSetting.value}`);
}

async function getPreview(fileName){
  return await bash.executeCommand(`gphoto2 --capture-image-and-download --filename images/preview/${fileName}`)
}

async function createVideo(videoSettings){
  if(videoSettings.captureSound){
    return await bash.executeCommandWithLiveUpdate(`gphoto2 --capture-movie ${videoSettings.videoLength}s --capture-sound`)
  }else{
    await bash.executeCommand(`gphoto2 --capture-movie ${videoSettings.videoLength}s `);
    //resetting mirror
    return await bash.executeCommand(`gphoto2 --set-config viewfinder=0`);
  }
}


module.exports = { setCameraSetting,getPreview,takePhotoAndDownloadPicture,checkCameraConfigurableSettings,
  checkConfigSettingsChoices,createTimeLaps, createVideo,takeSessionPhoto}
