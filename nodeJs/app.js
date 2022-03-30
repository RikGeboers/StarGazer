var express = require('express');
const { telescopeManager } = require('./telescope/telescopeStrategyManager')
const { telescope } = require('./telescope/telescopeStrategy')
var app = express();
var fs = require("fs");
const camera = require("./camera/camera")
const bash = require("./commands/bashCommands")
const path = require('path');
const textProcessor = require("./dataProcessor/processTextResults");
const req = require('express/lib/request');
const functions = require("./dataProcessor/dataFunctions");
const { ok } = require('assert');
app.use(express.json());
app.use(express.text());
const sessionCreator = require('./session/sessionManager');
app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")))
app.use("/bootstrap", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")))
app.use("/jquery", express.static(path.join(__dirname, "node_modules/jquery/dist")))
app.use("/popper", express.static(path.join(__dirname, "node_modules/popper.js/dist")))



//Admin Portal
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get('/editTelescope.html', (req, res) => {
  res.sendFile(__dirname + "/public/editTelescope.html");
});

app.get('/main.js', (req, res) => {
  res.sendFile(__dirname + "/public/js/main.js");
});

app.get('/telescopeTemplate.txt', (req, res) => {
  res.sendFile(__dirname + "/public/telescopeTemplate.txt");
})

app.get('/telescopeImplementation.js', (req, res) => {
  res.sendFile(__dirname + "/telescope/" + req.query.name + ".js");
})


app.get('/getPhoto', function (req, res) {
  var file = `photo_${functions.getFormattedTime()}.jpg`
  camera.takePhotoAndDownloadPicture(file).then(response => {
    var location = path.join('./images/photos', file);
    res.download(location, file);
  }).catch(error => {
    console.log(error)
    res.status(500);
    res.send(error);
  });

})

app.get('/getCameraConfigurableSettings', async function (req, res) {
  camera.checkCameraConfigurableSettings().then(response => {
    res.end(JSON.stringify(textProcessor.splitLinesToArrayAndGetLastWord(response)));
  }).catch(error => {
    console.error(error)
    res.status(500);
    res.send(error);
  });

})

app.get('/getConfigSettingsChoices/:setting', async function (req, res) {
  camera.checkConfigSettingsChoices(req.params.setting).then(response => {
    res.end(JSON.stringify(textProcessor.processSettingsChoices(response)));
  }).catch(error => {
    console.log(error)
    res.status(500);
    res.send(error);
  });
});


//veranderen naar een post met data in 
app.get('/getTimeLapsAction', async function (req, res) {
  timelapsSettings = {
    interval: 5,
    snapShotCount: 10,
    folderName: "testDir"
  }
  camera.createTimeLaps(timelapsSettings).then(response => {
    res.end(JSON.stringify(textProcessor.processSettingsChoices(response)));
  }).catch(error => {
    console.log(error)
    res.status(500);
    res.send(error);
  });
});

//veranderen naar een post met data in 
app.post('/postVideoAction', async function (req, res) {
  console.log(req.body)
  camera.createVideo(req.body).then(response => {
    console.log(response);
    res.send(ok);
  }).catch(error => {
    console.log(error)
    res.status(500);
    res.send(error);
  });
});


app.get('/getCreatedVideo', async function (req, res) {
    var file = 'movie.mjpg';
    var location = path.join('./', file);
    if(fs.existsSync(location)){
      res.download(location, file);

    }else{
      console.log("File not found")
      res.status(404);
      res.send("file not found");
    }

});

app.get('/getPreview', async function (req, res) {
  var file = `preview_${functions.getFormattedTime()}.jpg`
  camera.getPreview(file).then(response => {

    var location = path.join('./images/preview', file);
    res.download(location, file);

  }).catch(error => {
    console.log(error)
    res.status(500);
    res.send(error);
  });
});

app.get('/getSavedTimeLapses', async function (req, res) {
  bash.getTimeLapseNames().then(response => {
    let processedResult = textProcessor.processFolderNames(response);
    res.end(JSON.stringify(processedResult))
  }).catch(error => {
    console.log(error)
    res.status(500);
    res.send(error);
  });
});

app.get('/getSavedSessions', async function (req, res) {
  bash.getSavedSessions().then(response => {
    let processedResult = textProcessor.processFolderNames(response);
    res.end(JSON.stringify(processedResult))
  }).catch(error => {
    console.log(error);
    res.status(500);
    res.send(error);
  });
});

app.get('/getSessionImageCount/:session', async function (req, res) {
  bash.getFileCountInFolder(`./images/sessions/${req.params.session}`).then(response => {
   console.log("File count: " + response)
   res.end(response);
  }).catch(error => {
    console.log(error);
    res.status(500);
    res.send(error);
  });
});

app.get('/getSession/:session', async function (req, res) {
  bash.createSessionZip(req.params.session).then(response => {
    var file = `${req.params.session}.zip`;
    var location = path.join('./', file);
    res.download(location, file, function () {
      console.log("Removing zip to save space")
      //Remove zip file after download to save space
      bash.removeFile(file);
    });
  }).catch(error => {
    console.log(error)
    res.status(500);
    res.send(error);
  })
});

app.get('/getTimeLapse/:name', async function (req, res) {
  bash.createZip(req.params.name, `TimeLapses/${req.params.name}`).then(response => {
    var file = `${req.params.name}.zip`
    var location = path.join('./', file);
    res.download(location, file, function (err) {
      //Remove zip file after download to save space
      bash.removeFile(file);
    });
  }).catch(error => {
    console.log(error)
    res.status(500);
    res.send(error);
  });
});

app.get("/getTelescopes", async function (req, res) {
  console.log("getting all telescopes")
  res.send(Object.keys(telescopeManager.strategies))
})

app.get("/getCurrentTelescope", async function (req, res) {
  console.log("getting current telescope")
  res.status(200)
  res.send(telescope.name)
})

app.post("/setTelescope", async function (req, res) {
  let name = req.query.name
  console.log("setting telescope to " + name)
  let strategy = Object.values(telescopeManager.strategies[name])[0]
  let conversionFactor = Object.values(telescopeManager.strategies[name])[1]
  let telescopeName = Object.values(telescopeManager.strategies[name])[2]
  telescope.setStrategy(strategy, conversionFactor, telescopeName)
  res.status(200)
  res.send("telescope set to " + telescopeName)
})

app.post('/postCoordinates', async function (req, res) {
  let query = req.query
  let raHours = parseInt(query.raHours)
  let raMinutes = parseInt(query.raMinutes)
  let raSeconds = parseInt(query.raSeconds)
  let decDegrees = parseInt(query.decDegrees)
  let decMinutes = parseInt(query.decMinutes)
  let decSeconds = parseInt(query.decSeconds)
  console.log("Received coordinates: RA %dh %dm %ds, DEC %d° %d' %d''", raHours, raMinutes, raSeconds, decDegrees, decMinutes, decSeconds)
  let ra = telescope.calculateRa(raHours, raMinutes, raSeconds)
  let dec = telescope.calculateDec(decDegrees, decMinutes, decSeconds)
  telescope.gotoPosition(ra, dec)
  res.status(200)
  res.send("Sent coordinates to telescope")
})

app.post('/move', async function (req, res, next) {
  let query = req.query
  let direction = query.direction
  let trackRate = query.trackRate
  try {
    switch (direction) {
      case "up":
        telescope.moveUp(trackRate)
        break;
      case "down":
        telescope.moveDown(trackRate)
        break;
      case "left":
        telescope.moveLeft(trackRate)
        break;
      case "right":
        telescope.moveRight(trackRate)
        break;
    }
    res.status(200)
    console.log("Moved telescope " + direction + " with trackrate " + trackRate)
    res.send("Moved telescope " + direction + " with trackrate " + trackRate)
  } catch (err) {
    console.error(err)
    res.send(err)
  }
})


app.post('/postCameraSetting', function (req, res) {
  console.log("result:" + req.body)
  camera.setCameraSetting(req.body).then(response => {
    res.sendStatus(200)
  }).catch(error => {
    console.log(error)
    res.status(500);
    res.send(error);
  });

});

app.post('/rebootBackend', async function (req, res) { 
  bash.executeCommand("yarn restart")
})

app.post('/postNewTelescope', function (req, res) {
  fs.writeFile('telescope/' + req.query.name, req.body, function (err) {
    if (err) throw err;
    console.log('Added ' + req.query.name);
  });
  var file = "telescope/telescopeStrategy.js"
  var data = fs.readFileSync(file); //read existing contents into data
  var dataToAdd = "require(\"./" + req.query.name + "\")\n"
  var fd = fs.openSync(file, 'w+');
  var buffer = Buffer.from(dataToAdd);
  fs.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
  fs.writeSync(fd, data, 0, data.length, buffer.length); //append old data
})

app.post('/editTelescope', function (req, res) {
  fs.writeFile('telescope/' + req.query.name, req.body, function (err) {
    if (err) throw err;
    console.log('Edited ' + req.query.name);
  });
})

app.delete('/deleteTelescope', function (req, res) {
  fs.unlink('telescope/' + req.query.name + ".js", function (err) {
    if (err) throw err;
    console.log("Removed " + req.query.name)
  })
  var data = fs.readFileSync('telescope/telescopeStrategy.js', 'utf-8');
  var dataToRemove = "require(\"./" + req.query.name + ".js\")"
  console.log(dataToRemove)
  var newValue = data.replace(dataToRemove, ''); 
  console.log(newValue)
  fs.writeFileSync('telescope/telescopeStrategy.js', newValue, 'utf-8');
  res.status(200)
})

app.post('/createSession', function (req, res) {
  let response = sessionCreator.createJob(req.body);
  if(response){
    res.sendStatus(200)
  }else{
    res.status(500);
    res.send(response);
  }
})

app.get('/getActiveSessions', function (req, res) {
  res.send(JSON.stringify(sessionCreator.getActiveJobs()));
})

app.delete('/deleteSessionFolder/:session', function (req, res) {
  bash.removeSessionFolder(req.params.session).then(response=>{
    res.sendStatus(200);
  }).catch(err =>{
    console.log(error)
    res.status(500);
    res.send(error);
  })
})

app.get('/getCompletedSessions', function(req,res){
  sessionCreator.getFinishedJobs().then(response =>{
    res.send(JSON.stringify(response));
  }).catch(err =>{
    console.log(error)
    res.status(500);
    res.send(error);
   }) 
});

app.delete('/cancelSession/:session', function(req,res){
  let response = sessionCreator.cancelJob(req.params.session);
  if(response){
    res.sendStatus(200);
  }else{
    console.log(response)
    res.status(500);
    res.send(response);
  }
});

app.get('/getKillgPhoto2ProcessAction', function(req,res){
  bash.killgPhoto2Processes().then(response =>{
    console.log(response)
    if(response){
      res.sendStatus(200)
    }else{
      res.status(500);
      res.send(error);
    }
  }).catch(err =>{
    console.log(error)
    res.status(500);
    res.send(error);
   }) 
});

app.get('/getCurrentTime', function(req,res){
  bash.getCurrentTime().then(response =>{
    res.send(response);
  }).catch(err =>{
    console.log(error)
    res.status(500);
    res.send(error);
   }) 
});

app.post('/setCurrentTime', function(req,res){
  console.log(req.body.currentTime);
  bash.setCurrentTime(req.body.currentTime).then(response =>{
    res.sendStatus(200)
  }).catch(err =>{
    console.log(error)
    res.status(500);
    res.send(error);
   }) 
});


var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("app listening at http://%s:%s", host, port)
});