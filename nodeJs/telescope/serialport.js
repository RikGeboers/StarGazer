const { SerialPort } = require('serialport')
const port = new SerialPort({ path: process.env.PORT, baudRate: 9600 })

let lastResponse = ""

// Event listeners
port.on('open', showPortOpen);   
port.on('close', showPortClose); 
port.on('error', showError);    
port.on('readable', readData);

// Listener functions 
function showPortOpen() {
  console.log('port open. Data rate: ' + port.baudRate);
}

function readData() {
    buffer = port.read()
    for (let entry of buffer.entries()) {
        lastResponse = entry[1]
    }
}

function showPortClose() {
  console.log('port closed.');
}

function showError(error) {
  console.log('Serial port error: ' + error);
}

function writeToPort(message) {
  port.write(message, "ascii", function(err) {
    if (err) {
      return console.log('Error on writing "' + message + '" :', err.message)
    }
    // console.log('sent "' + message +'" to port "' + portName + '" ')
  })
}

function getLastResponse() {
  return lastResponse
}

module.exports = { writeToPort, getLastResponse }
