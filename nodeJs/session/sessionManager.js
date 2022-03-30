const schedule = require('node-schedule');
const camera = require("../camera/camera")
const _ = require('lodash');
const textProcessor = require("../dataProcessor/processTextResults");
const bash = require("../commands/bashCommands")
let activeJobList = [];

function createJob(sessionInfo) {
    let startDate = new Date(sessionInfo.startDate);
    let endDate = new Date(sessionInfo.endDate);



    try {
        if (sessionInfo.intervalMode) {
            let rule = `*/${sessionInfo.intervalValue} * * * *`;
            const job = schedule.scheduleJob(sessionInfo.sessionName, { start: startDate, end: endDate, rule: rule }, function () {
                jobTaskTakeSessionPhotoFunction(sessionInfo.sessionName,sessionInfo.interValCamera);
            })
            activeJobList.push(sessionInfo);
        } else {
            let actualName = sessionInfo.sessionName;
            for (let i = 0; i < sessionInfo.scheduledJobs.length; i++) {
                let copy = {...sessionInfo};
                copy.sessionName = (actualName + '_job_' + i);
                let startDate = new Date(sessionInfo.startDate);
                startDate.setHours(sessionInfo.scheduledJobs[i].time.substring(0, 2));
                startDate.setMinutes(sessionInfo.scheduledJobs[i].time.substring(3, 5));
                startDate.setSeconds(sessionInfo.scheduledJobs[i].time.substring(6, 8));

                //Check if the time is not in the paste, if so add a date.
                if (Date.parse(startDate) - Date.parse(new Date()) < 0) {
                    //Time has already passed, add day to job
                    startDate.setDate(startDate.getDate() + 1);
                }
                const job = schedule.scheduleJob(copy.sessionName, startDate, function () {
                    jobTaskTakeSessionPhotoFunction(actualName,sessionInfo.scheduledJobs[i].settings);
                }) 
                
                activeJobList.push(copy);
            }

        }
        return true;
    } catch (err) {
        return err;
    }

}



function cancelJob(jobName) {
    console.log("Cancelling job: " + jobName);
    try{
        return schedule.cancelJob(jobName);
    }catch(err){
        return err;
    } 
}

function getActiveJobs() {
    let jobNames = [];
    _.forEach(schedule.scheduledJobs,function(value,key){
        if(value.pendingInvocations.length !== 0){
            jobNames.push(key);
        }
    })


    return compareAndEditActiveJobList(jobNames);
}

function compareAndEditActiveJobList(jobNames){
    for(let i=0;i<activeJobList.length;i++){
        let found = false;
        for(let j=0;j<jobNames.length;j++){
            if(jobNames[j] === activeJobList[i].sessionName){
                found = true;
            }
        }
        if(!found){
            activeJobList.splice(i,1);
        }
    }
    return activeJobList;

}


async function getFinishedJobs() {
    let sessionFolders = await bash.getSavedSessions().then(response => {
        let processedResult = textProcessor.processFolderNames(response);
        return processedResult;
    }).catch(error => {
        console.log(error);
    });
    let activeJobs = getActiveJobs();
    if (activeJobs.length === 0) {
        return sessionFolders;
    } else {
        let completedJobs = sessionFolders.filter(job => !activeJobs.includes(job));
        return completedJobs;
    }
}




async function jobTaskTakeSessionPhotoFunction(sessionName, cameraSettings) {

    console.log("Executing job: " + sessionName)
    if(cameraSettings !== undefined){
        for(let i=0;i<cameraSettings.length;i++){
            await camera.setCameraSetting(cameraSettings[i])
        }
    }
    
    camera.takeSessionPhoto(sessionName);

}







module.exports = { createJob, cancelJob, getActiveJobs, getFinishedJobs }
