const serialport = require("./serialport")
const { telescopeManager } = require("./telescopeStrategyManager")

/**
 * Implementation of strategy pattern for the Nexstar5 telescope
 * Note that raSeconds and decSeconds are not necessary for the byte calculations for a nexstar5, thus, making a midByte unnecessary
 * The bytes calculated in calculateRa and calculateDec will be written to the serialport as characters in the gotoPosition method
 */
class NexStar5 {
    constructor() {
        this.calculateDec = function (conversionFactor, decDegrees, decMinutes, decSeconds) {
            let dec = 0
            if (decDegrees > 0) {
                dec = parseInt((decDegrees * 60 + decMinutes) * 3 * conversionFactor)
            } else {
                dec = parseInt(((360 * 60) - (Math.abs(decDegrees) * 60 + decMinutes)) * 3 * conversionFactor)
            }
            let decHighByte = parseInt(dec / 256)
            let decLowByte = dec % 256
            return [decHighByte, decLowByte]
        }

        this.calculateRa = function (conversionFactor, raHours, raMinutes, raSeconds) {
            let ra = parseInt((((raHours * 60 + raMinutes) * 15) * 3 * conversionFactor))
            let raHighByte = parseInt(ra / 256)
            let raLowByte = ra % 256
            return [raHighByte, raLowByte]
        }

        this.gotoPosition = function (ra, dec) {
            serialport.writeToPort("?") // Initialization
            serialport.writeToPort("R") // ASCII R (=82)
            console.log(ra)
            console.log(dec)
            serialport.writeToPort(String.fromCharCode(ra[0])) // Ra High Byte
            serialport.writeToPort(String.fromCharCode(ra[1])) // Ra Low Byte
            serialport.writeToPort(String.fromCharCode(dec[0])) // Dec High Byte
            serialport.writeToPort(String.fromCharCode(dec[1])) // Dec Low Byte
        }

        this.moveUp = function () {
            throw "Telescope does not support this method"
        }

        this.moveDown = function () {
            throw "Telescope does not support this method"
        }

        this.moveLeft = function () {
            throw "Telescope does not support this method"
        }

        this.moveRight = function () {
            throw "Telescope does not support this method"
        }
    }
}

telescopeManager.addStrategy("NexStar5", new NexStar5(), 1.011358025)

