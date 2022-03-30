
var exec = require('child_process').exec;






//create a folder with the date of today
async function createFolderFromToday(){
    return await executeCommand(`mkdir $(date +"%d-%m-%Y")`);
}


async function getTimeLapseNames(){
    return await executeCommand(`ls -d TimeLapses/*/`);
}

async function getSavedSessions(){
    return await executeCommand(`ls -d images/sessions/*/`);
}


async function killgPhoto2Processes(){
    try{
        let res = await executeCommand(`ps -ef | grep gphoto | awk '{print $2}'`)
        res = res.split(/\r?\n/);
    
        for(let i=0;i<res.length;i++){
            await executeCommand(`kill -9 ${res[i]}`);
        }
        return true;
    }catch(err){
        return err
    }

}


async function getCurrentTime(){
    return await executeCommand(`date +"%T"`)
}

async function setCurrentTime(time){
    return await executeCommand(`sudo date +%T -s "${time}"`)
}



async function executeCommandWithLiveUpdate(command){
    return new Promise((resolve,reject) =>{
	var child = exec(command);
        child.stdout.on('data', function (data) {
            console.log('stdout: ' + data.toString());
          });
          
          child.stderr.on('data', function (data) {
              reject(`Failed executing command ${command}. Error: ${data.toString()}`)
          });
          
          child.on('exit', function (code) {
              resolve('Action finished with code: ' + code.toString())

          });
    })
    
}

async function executeCommand(command){
    return new Promise((resolve,reject) =>{
        
        exec(`${command}`, function (err,stdout){
                    if(err){
                        reject(`Failed executing command ${command}. Error: ${err}`);
                    }
                    resolve(stdout);                                
                });  
    })
    
}

function executeCommandWithoutWait(command){        
        exec(`${command}`, function (err,stdout){
                    if(err){
                        return new Error(`Failed executing command ${command}. Error: ${err}`)
                    }
                });  
   
}

async function createZip(filename,folderName){
    return await executeCommand(`zip -r ${filename}.zip ${folderName}`);
}

async function createSessionZip(folderName){
    return await executeCommand(`zip -r ${folderName}.zip images/sessions/${folderName}`)
}

function removeFile(file){
    executeCommandWithoutWait(`rm ${file}`);
}

async function getFileCountInFolder(folderName){
    return await executeCommand(`find ${folderName} -maxdepth 1 -exec echo \\; | wc -l`);
}

async function removeSessionFolder(sessionName){
    return await executeCommand(`sudo rm -r ./images/sessions/${sessionName}`);

}



module.exports = { createFolderFromToday,executeCommand,executeCommandWithLiveUpdate,
    executeCommandWithoutWait,getTimeLapseNames,createZip,
    removeFile,getSavedSessions,createSessionZip,getFileCountInFolder,
    killgPhoto2Processes,getCurrentTime,setCurrentTime,removeSessionFolder
}





