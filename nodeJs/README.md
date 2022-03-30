# Installing the Raspberry PI backend server

- Download the zip file with the ISO IMAGE. The image is a clone of our created image. The file is compressed into a zip file, the is because cloning an image clones the while SD card. In our case the whole 16GB. Compressing into a zip file compresses it to about ~3GB.

- Once you have downloaded and extracted the ISO image, burn this onto your SD card, since we used a 16GB card you have to have one atleast this size.

- Once burned onto your SD card, insert it into your raspi and power it on, the raspi is configured as an access point.

- [DOWNLOAD ISO HERE](https://drive.google.com/file/d/1tAimgd7P8ZTbrneKxkHGZtJNhRnzOfLh/view?usp=sharing)

# Connecting to StarGazer server


- The access point is named 'StarGazer', the password is 'Stargazer01'. Connect to this via the phone running our application.
  
- If you want to access the WEB UI backend to add your own telescope, connect to 'http://192.168.1.1:8081' this is the default gateway of the access point with our server ports.
  
- You can also check the connection in the application by going to settings and 'check device time', if you get a time, the connection is successful.


# Extra information

## CLI to the Raspberry Pi

- To configure the Raspberry pi via ssh, connect the Raspberry pi via ethernet cable.

- Check your router for the IP address given to the Raspberry pi

- Login with: username: 'pi' password: 'raspberry'

## Check the backend server status
- We use PM2 to manage our server process, you can check the status of the running process with 
```shell
pm2 list
```
- To view the logs and errors the backend shows use
```shell
pm2 logs
```
## Download newest backend version
- Navigate to our project directory 
```shell
~stargazer/stargazer-backend/
  ```
- Use git pull

- Login with your git account that has access to the repository

- Restart the backend server with
```shell
pm2 restart app
  ```

