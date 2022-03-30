const camera = require("../camera/camera")

function splitLinesToArrayAndGetLastWord(input){
    let splitted = input.toString().split('\n');
    splitted.pop();
    console.log(splitted);
    for(let i=0;i<splitted.length;i++){
        splitted[i] = splitted[i].substring(splitted[i].lastIndexOf('/') + 1);
    }
    console.log(splitted);
    return splitted;
}


function processSettingsChoices(input){
    let splitted = input.toString().split('\n');
    //Removing top parts
    splitted.splice(0,4);
    console.log(splitted);
    //Remove last item 'END'
    splitted.pop();
    splitted.pop();
    for(let i=0;i<splitted.length;i++){
        splitted[i] = splitted[i].substring(splitted[i].indexOf(':')+1);
    }

   console.log(splitted);
   return splitted;


}

function processFolderNames(input){
    let splitted = input.toString().split('\n');
    splitted.pop();
    for(let i=0;i<splitted.length;i++){
        splitted[i] = splitted[i].slice(0,-1);
        splitted[i] = splitted[i].substring(splitted[i].lastIndexOf('/') + 1,splitted[i].length);
    }
    return splitted;
}





module.exports = { splitLinesToArrayAndGetLastWord,processSettingsChoices,processFolderNames };
