const serialport = require("./serialport")
const { telescopeManager } = require("./telescopeStrategyManager")

/**
 * Implementation of strategy pattern for the NexStar6 SE telescope
 * Note that raSeconds and decSeconds are not necessary for the byte calculations for a NexStar6 SE, thus, making a midByte unnecessary
 * The bytes calculated in calculateDec and calculateRa will be converted to hex values and sent out the serialport in the gotoPosition command.
 */
class NexStar6SE {
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
            let message = "R" + ra[0].toString(16) + ra[1].toString(16) + "," + dec[0].toString(16) + dec[1].toString(16)
            serialport.writeToPort(message.toUpperCase())
        }

        this.moveUp = function (trackRate) {
            serialport.writeToPort("P")
            serialport.writeToPort(String.fromCharCode(2))
            serialport.writeToPort(String.fromCharCode(17))
            serialport.writeToPort(String.fromCharCode(36))
            serialport.writeToPort(String.fromCharCode(trackRate))
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort(String.fromCharCode(0))
        }

        this.moveDown = function (trackRate) {
            serialport.writeToPort("P")
            serialport.writeToPort(String.fromCharCode(2))
            serialport.writeToPort(String.fromCharCode(17))
            serialport.writeToPort(String.fromCharCode(37))
            serialport.writeToPort(String.fromCharCode(trackRate))
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort(String.fromCharCode(0))
        }

        this.moveLeft = function (trackRate) {
            serialport.writeToPort("P")
            serialport.writeToPort(String.fromCharCode(2))
            serialport.writeToPort(String.fromCharCode(16))
            serialport.writeToPort(String.fromCharCode(36))
            serialport.writeToPort(String.fromCharCode(trackRate))
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort(String.fromCharCode(0))
        }

        this.moveRight = function (trackRate) {
            serialport.writeToPort("P")
            serialport.writeToPort(String.fromCharCode(2))
            serialport.writeToPort(String.fromCharCode(16))
            serialport.writeToPort(String.fromCharCode(37))
            serialport.writeToPort(String.fromCharCode(trackRate))
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort(String.fromCharCode(0))
        }
    }
}

telescopeManager.addStrategy("NexStar6SE", new NexStar6SE(), 1.011358025)
