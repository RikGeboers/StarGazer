
require("./NexStar5.js")
require("./NexStar6SE.js")

const { telescopeManager } = require("./telescopeStrategyManager")

class Telescope {
    /**
     * Protocol belongs to a telescope
     * Every telescope has a conversionFactor used for calculating Ra/Dec values
     */
    constructor() {
        this.telescope = "";
        this.conversionFactor = 0;
        this.name = "";
    }
 
    /**
     * Strategy pattern allows addition of new telescopes with their own implementation of coordinate calculations and goto protocol
     * @param {Object} telescope implementation of a telescope containing functions
     * @param {number} conversionFactor factor to go from number of steps to the software resolution of the telescope
     * @param {String} name name of the telescope
     */
    setStrategy(telescope, conversionFactor, name) {
        this.conversionFactor = conversionFactor;
        this.telescope = telescope;
        this.name = name;
    }
    
    /**
     * Declination part of the coordinates
     * ex. (-19° 42' 48")
     * @param {number} decDegrees 
     * @param {number} decMinutes 
     * @param {number} decSeconds 
     * @returns {[]} array of bytes
     */
    calculateDec(decDegrees, decMinutes, decSeconds) {
        return this.telescope.calculateDec(this.conversionFactor, decDegrees, decMinutes, decSeconds);
    }
   
    /**
     * Right ascension part of the coordinates
     * ex. (02h 34m 12s)
     * @param {number} raHours 
     * @param {number} raMinutes 
     * @param {number} raSeconds 
     * @returns {[]} array of bytes
     */
    calculateRa(raHours, raMinutes, raSeconds) {
        return this.telescope.calculateRa(this.conversionFactor, raHours, raMinutes, raSeconds);
    }

    /**
     * Describe the sequence of messages that have to be sent to the telescope
     * ra and dec are arrays containing bytes that the telescope can understand as coordinates
     * @param {[]} ra right ascension (array of bytes)
     * @param {[]} dec declination (array of bytes)
     */
    gotoPosition(ra, dec) {
        this.telescope.gotoPosition(ra, dec);
    }

    /**
     * Change declination/altitude to slew in positive direction
     * @param {number} trackRate speed of the movement
     */
    moveUp(trackRate) {
        this.telescope.moveUp(trackRate);
    }

    /**
     * Change declination/altitude to slew negative direction
     * @param {number} trackRate speed of the movement
     */
    moveDown(trackRate) {
        this.telescope.moveDown(trackRate);
    }

     /**
      * Change right ascension/azimuth to slew in positive direction
      * @param {number} trackRate speed of the movement 
      */
      moveLeft(trackRate) {
        this.telescope.moveLeft(trackRate);
    }

   /** 
    * Change right ascension/azimuth to slew in negative direction
    * @param {number} trackRate speed of the movement
    */
    moveRight(trackRate) {
        this.telescope.moveRight(trackRate);
    } 
}

const telescope = new Telescope()

// Set default strategy to use
let strategy = Object.values(telescopeManager.strategies["NexStar5"])[0]
let conversionFactor = Object.values(telescopeManager.strategies["NexStar5"])[1]
let name = Object.values(telescopeManager.strategies["NexStar5"])[2]
telescope.setStrategy(strategy, conversionFactor, name)

module.exports = { telescope }
