# StarGazer
Our app is build for total offline usability. Meaning we don't require internet access to find the coordinates of following Celestial Bodies:

- Planets _(Generated if location permissions granted)_
- Messier
- NGC
- IC

Library size: 14 079 Celestial Bodies.                      
Your desired object not in the list?                        
Add it manually in the app!
## Quick Start
Install the expo app and scan this qr code.   
[Expo project](https://expo.dev/@rikkertschool/StarGazer?serviceType=classic&distribution=expo-go).

![expo qr](https://qr.expo.dev/expo-go?owner=rikkertschool&slug=StarGazer&releaseChannel=default&host=exp.host)               
[qr not working? Open in expo.](exp://exp.host/@rikkertschool/StarGazer?release-channel=default)

## Starting Project
After cloning the project follow these steps:

1. Be sure to check `.env` file
   for development you might want to change the ip address.          
   For production connect back with the raspberry PI address:

   ```
    STARGAZER_IP_CONNECTION=http://192.168.1.1:8081
   ```

2. To startup the project in development:

   `yarn start`
   this will give a qr code combined with a list of useful commands.

   - reload connected devices: `R`
   - android emulator: ` A` (requires android studio)
   - ios emulator:`I`(requires xcode)
   - web: `w`
   - toggle menu: `m`(or shake device)

3. Going into production:                    
   with the following command we started building procedure for an apk (or bundle)              
   ` expo build:android`
   to update apks, or other pre releases, use:
   `expo publish`

## Data

   In folder `services/internal/bodies/data` we have our json files of messier,ngc and planets.
   `planets.json`is not in use sinds we generate this data in `src/calculations`with the help of your current location, generated in `src/utils`.
   Inside the app you can manually add Celestial Objects.

## Permissions

   We use 2 essential permissions, we advise you to grant them for the optimal experience.

   - Location
   - Media Library

   ##### Location

   This is needed in order to

   1. Update the coordinates of the planets since they constantly change. (they move around the Earth)
   1. Can help you to configure telescope faster. No need to search your current coordinates, we will do it for you.

   ##### Media Library

   We download the images, or videos from the raspberry pi to our app. But in order for you to access/share them, 
   we need your permission to save them on your device. 
   It will create a folder `StarGazer` where you can find all of the exported previews.
   

## References

   ##### Images

   Images where used in our Library to help with visualization.
      - <a href="https://www.vecteezy.com/free-vector/rock">Rock Vectors by Vecteezy</a>
      - <a href='https://www.freepik.com/vectors/technology'>Technology vector created by acrovector - www.freepik.com</a>

   Images were edited by: [Elke Geboers](https://capturacreates.com)

   ##### Astronomy calculations

   [Astronomy.js](http://cosinekitty.com/astronomy.js)
   This was used to help calculate current coordinates of planets.
