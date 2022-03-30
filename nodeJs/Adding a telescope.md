# Adding a telescope
This tutorial will demonstrate how to add a new telescope to a list of existing telescopes in the StarGazer backend so that it can be used by the StarGazer app.
## Strategy pattern
A strategy pattern is used for adding new telescopes and their specific protocols, allowing for easy interchangeability between telescopes with different (byte) calculations and protocols.

To understand the concept of the strategy pattern, we recommend to first take a quick look at [this example](https://www.dofactory.com/javascript/design-patterns/strategy) which demonstrates how to use the strategy pattern in JavaScript.

### telescopeStrategy.js
The telescopeStrategy.js file contains the class `Telescope` and has the following lines of code.
To explain the workings of this class we will take a look at each method individually.

```js
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
```

#### setStrategy method
```js
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
```
Method used for setting the **instance of the telescope**, its **conversionFactor** and **name** of the telescope.
the **conversionFactor** of a telescope is a given: For Celestron NexStar telescopes a file found on [this webpage](https://www.nexstarsite.com/PCControl/OldGTCommands.htm) named EncoderCalculations.xls shows how the conversionFactor is calculated based on the software resolution. This value can differ from telescope to telescope and therefore, it is necessary to figure out this value for the telescope you wish to add.

#### calculateDec method
```js
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
```

Method used to calculate the declination. What this method returns is entirely dependant on the telescope. For example: The NexStar 5 telescope return statement `return [decHighByte, decLowByte]` returns both a highbyte and a lowbyte, which it derived from a series of calculations specific to the NexStar 5. In essence, this method should return an array of values that the telescope can use to move the telescope to the right **declination** coordinate. Other telescopes like the NexStar GPS for example, need a midbyte in combination with the high and low byte to be able to slew correctly in the right position. Again, the conversionFactor is necessary here to perform the correct calculations.

#### calculateRa method
```js
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
```
Very similar method to the calculateDec method, but this time for calculating the right-ascension.
This methods return statement is also very similar `return [raHighByte, raLowByte]`. As mentioned in the calculateDec method, the return of this method is specific to the telescope, you might need to add a midByte for example. The principle stays the same here: This method should return something that the telescope can use to move to the right **right ascension** coordinate.

#### gotoPosition method
```js
   /**
     * Describe the sequence of messages that have to be sent to the telescope
     * ra and dec are arrays containing bytes that the telescope can understand as coordinates
     * @param {[]} ra right ascension (array of bytes)
     * @param {[]} dec declination (array of bytes)
     */
    gotoPosition(ra, dec) {
        this.telescope.gotoPosition(ra, dec);
    }
```
This method is where the magic happens. the `ra` and `dec` parameters contain data necessary for moving the telescope to the correct **declination** and **right ascension**. They are calculated in the `calculateDec` and `calculateRa` methods.

It is important to adhere to the protocol of your specific telescope. An example of a protocol (NexStar 5):
````
Before all commands, the following INITIALIZATION is necessary
• PC sends one byte (63=Ascii “?”) to check that NexStar is ready.
• NexStar responds with one byte (35) when NexStar is ready to respond. After NexStar sends a 35, the
buttons to the hand control do not respond until the command from the PC has been received, then the
direction, rate, and undo buttons are active.

Goto RA-Dec positions
• INITIALIZATION
• PC sends (82=Ascii “R”)
• PC sends the RA high byte, RA low byte, Dec high byte, Dec low byte.
• When the scope is finished slewing, it will send back a “@”.
`````
Following this protocol leads us to create a series of messages written to the port linked to the telescope.
This example protocol for the NexStar 5 described above can be executed by the following sequence of messages written to the serialport.
```js
  this.gotoPosition = function (ra, dec) {
            serialport.writeToPort("?") // Initialization
            serialport.writeToPort("R") // ASCII R (=82)
            serialport.writeToPort(String.fromCharCode(ra[0])) // Ra High Byte
            serialport.writeToPort(String.fromCharCode(ra[1])) // Ra Low Byte
            serialport.writeToPort(String.fromCharCode(dec[0])) // Dec High Byte
            serialport.writeToPort(String.fromCharCode(dec[1])) // Dec Low Byte
        }
```
Ultimately, making the NexStar 5 telescope move.
To implement this method for your added telescope, make sure the protocol of the new telescope is fully understood.

An example of what the gotoPosition method for a NexStar 6SE would look like:
````js
    this.gotoPosition = function (ra, dec) {
        let message = "R" + ra[0].toString(16) + ra[1].toString(16) + "," + dec[0].toString(16) + dec[1].toString(16)
        serialport.writeToPort(message.toUpperCase())
    }
````


#### Move methods
````js
/**
     * Change declination/altitude to slew in positive direction
     * @param {number} trackRate speed of the movement
     */
    moveUp(trackRate) {
        this.telescope.moveUp(trackRate);
    }
````
Allows the telescope to move up, down, left and right. Changing the **trackRate** allows us to move the telescope at different speeds. Not all telescopes support this method, for example, the NexStar 5 does not support this method and throws this message in case it is called.

Again, every telescope might have a very different protocol for actually moving the telescope.
The protocol for the NexStar GPS, NexStar GPS-SA, NexStar iSeries, NexStar SE Series, NexStar GT, CPC, SLT, AdvancedGT, and CGE mounts. All describe the following protocol for moving the telescope up:

````
Fixed rate Alt (or DEC) slew in positive direction
“P” &
chr(2) &
chr(17) &
chr(36) &
chr(rate) &
chr(0) &
chr(0) &
chr(0) 
````
Because moving the telescope can interfere wit the tracking of the telescope, it is recommended to turn tracking mode off before moving in the different directions and then turning the tracking mode on again.

Taking the previous protocol, and the disabling of the tracking in mind, this would result in the following code for the NexStar6SE (moveUp function)
````js
    this.moveUp = function (trackRate) {
        serialport.writeToPort("T")
        serialport.writeToPort(String.fromCharCode(0))
        serialport.writeToPort("P")
        serialport.writeToPort(String.fromCharCode(2))
        serialport.writeToPort(String.fromCharCode(17))
        serialport.writeToPort(String.fromCharCode(36))
        serialport.writeToPort(String.fromCharCode(trackRate))
        serialport.writeToPort(String.fromCharCode(0))
        serialport.writeToPort(String.fromCharCode(0))
        serialport.writeToPort(String.fromCharCode(0))
        serialport.writeToPort("T")
        serialport.writeToPort(String.fromCharCode(1))
    }
````
It is also possible that your telescope does not support moving it directionally at all. Then it is important to still implement the method but with an error. This is the case for the NexStar 5:
````js
    this.moveUp = function () {
        throw "Telescope does not support this method"
    }
````
Make sure to throw an error message like this when your telescope does not support a certain method. This results in better error handling.

### Adding a new telescope to the strategy pattern
If the contents of `telescopeStrategy.js` is fully understood, moving on to this section will learn you how to add your own telescope to the strategy pattern. 

#### Step 1
Open `localhost:8081` in your webbrowser. This wil take you to a page where you can add your own telescope.
A template is provided on this page for you to fill in with code specific to your telescope. 

(If you do not enjoy typing your code in this textarea and prefer to write your code in an IDE, feel free to add this template without filling it in, give the template a name and save the changes. This file will then be added to `telescope/YourTelescope.js` and will have the necessary dependencies ready. You can then edit this file in your IDE)

#### Step 2
Write your own implementation of the methods described in the strategy pattern
Please research and understand the relevant parts of the manual of your telescope in order to write the right implementation of these functions. Read the TODO's carefully when implementing these methods. 

On the webpage you can also find a dropdownlink "Telescopes" with 2 already implemented and working telescopes. You can use these as examples. These files are also found under `telescope/NexStar5.js` and `telescope/NexStar6SE.js`

The following code is found on `localhost:8081`, in a template that you can edit. Important to note is the `conversionFactor` variable. the **conversionFactor** of a telescope is a given: For Celestron NexStar telescopes a file found on [this webpage](https://www.nexstarsite.com/PCControl/OldGTCommands.htm) named EncoderCalculations.xls shows how the conversionFactor is calculated based on the software resolution. This value can differ from telescope to telescope and therefore, it is necessary to figure out this value for the telescope you wish to add.

```js
const serialport = require("./serialport")
const { telescopeManager } = require("./telescopeStrategyManager")

// TODO change name of the class to the name of your telescope
class YourTelescope {
    constructor() {
        this.calculateDec = function (conversionFactor, decDegrees, decMinutes, decSeconds) {
          // TODO: implement calculation of Declination, in most cases, this method returns a couple of bytes
        }

        this.calculateRa = function (conversionFactor, raHours, raMinutes, raSeconds) {
          // TODO: implement calculation of Right Ascension, in most cases, this method returns a couple of bytes
        }

        this.gotoPosition = function (ra, dec) {
          // TODO: implement sequence of writes to the serialport, using the Right Ascension (ra) and Declination (dec) to move to the telescope
          // note: it is important that you adhere to the protocol for your specific telescope, this protocol is often described in the user manual as "Goto RA/Dec"
        }

        this.moveUp = function () {
          // TODO: implement this method to point the tube of the telescope upwards
          // note: it is important that you adhere to the protocol for your specific telescope, this protocol is often described in the user manual as "Slewing commands"
        }

        this.moveDown = function () {
          //TODO: implement this method to point the tube of the telescope downwards
          // note: it is important that you adhere to the protocol for your specific telescope, this protocol is often described in the user manual as "Slewing commands"
        }

        this.moveLeft = function () {
          //TODO: implement this method to point the tube of the telescope to the left
          // note: it is important that you adhere to the protocol for your specific telescope, this protocol is often described in the user manual as "Slewing commands"
        }

        this.moveRight = function () {
          //TODO: implement this method to point the tube of the telescope to the right
          // note: it is important that you adhere to the protocol for your specific telescope, this protocol is often described in the user manual as "Slewing commands"
        }
    }
}

// TODO: change this to your telescope 
// note: the 1.011358025 value signifies the conversionFactor for your telescope, 
// this is thoroughly explained in the "Adding a telescope" markdown file in the StarGazer repository
telescopeManager.addStrategy("your telescope name", new YourTelescope(), 1.011358025)

````
This template filled in for the NexStar6SE looks like this:

````js
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
            serialport.writeToPort("T")
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort("P")
            serialport.writeToPort(String.fromCharCode(2))
            serialport.writeToPort(String.fromCharCode(17))
            serialport.writeToPort(String.fromCharCode(36))
            serialport.writeToPort(String.fromCharCode(trackRate))
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort("T")
            serialport.writeToPort(String.fromCharCode(1))
        }

        this.moveDown = function (trackRate) {
            serialport.writeToPort("T")
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort("P")
            serialport.writeToPort(String.fromCharCode(2))
            serialport.writeToPort(String.fromCharCode(17))
            serialport.writeToPort(String.fromCharCode(37))
            serialport.writeToPort(String.fromCharCode(trackRate))
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort("T")
            serialport.writeToPort(String.fromCharCode(1))
        }

        this.moveLeft = function (trackRate) {
            serialport.writeToPort("T")
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort("P")
            serialport.writeToPort(String.fromCharCode(2))
            serialport.writeToPort(String.fromCharCode(16))
            serialport.writeToPort(String.fromCharCode(36))
            serialport.writeToPort(String.fromCharCode(trackRate))
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort("T")
            serialport.writeToPort(String.fromCharCode(1))
        }

        this.moveRight = function (trackRate) {
            serialport.writeToPort("T")
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort("P")
            serialport.writeToPort(String.fromCharCode(2))
            serialport.writeToPort(String.fromCharCode(16))
            serialport.writeToPort(String.fromCharCode(37))
            serialport.writeToPort(String.fromCharCode(trackRate))
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort(String.fromCharCode(0))
            serialport.writeToPort("T")
            serialport.writeToPort(String.fromCharCode(1))
        }
    }
}

telescopeManager.addStrategy("NexStar6SE", new NexStar6SE(), 1.011358025)

````
Please consult the manual of the telescope that you are trying to add when implementing these methods. [This link](https://www.celestron.com/pages/manuals) contains manuals for all celestron NexStar telescopes. Be sure to take a look at the RS232 commands section. It is also important to do the necessary research for calculating the RA / Dec bytes. For Celestron NexStar telescopes [download this excel file](https://www.nexstarsite.com/download/EncoderCalculations.zip) EncoderCalculations.xls which shows how to calculate the right ascension and declination bytes for these telescopes.  [Download this zip file](https://www.nexstarsite.com/download/VBScopeControl.zip) to get an example of code to calculate Ra/Dec, used in official NexStar software [NexStar observer list](https://www.nexstarsite.com/NSOL.htm). These files are very useful for implementing the **calculateRa** and **calculateDec** functions.

[This pdf](https://s3.amazonaws.com/celestron-site-support-files/support_files/1154108406_nexstarcommprot.pdf) also contains useful information for the NexStar GPS, NexStar GPS-SA, NexStar iSeries, NexStar SE Series, NexStar GT, CPC, SLT, AdvancedGT, and CGE mounts. And was a large contributor for implementing the **gotoPosition** and **moveUp** , **moveDown**, **moveLeft**, **moveRight** functions.

#### Step 3
Press "Add telescope", then enter the name of your telescope and save the changes.
Your telescope will automatically be added to `telescope/YourTelescope.js`.

#### Step 4
Restart the StarGazer backend.
To make sure the code runs with your newly added telescope, you will have to restart the StarGazer backend.
Reboot by clicking on the reboot button in the top right corner. Refresh your page after this and your telescope will be added.

Now you are all done and ready to start using your telescope by selecting it in the StarGazer front-end application.









