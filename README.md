# PicGenApp

React Navite app to generate pictures with AI stable diffusion.
It runs on your local system and not on a cloud server.

![Alt text](/assets/AppExampleSmall.jpg "App Screenshot")

## Frontend
React Native not yet optimized for IOS or Android.
Runs on https://expo.dev/

## Backend
Pathon with multiple servers. Runs on local system. Graphic card user GTX 1080 TI.
- Stable Diffusion server loaded with Automatic1111 package. https://github.com/AUTOMATIC1111/
- Flask Server to have a customizable server leyer on top of stable diffusion and run stable diffusion as standard to not disturb the updates. "Waitress" for production WSGI server to the internet. https://flask.palletsprojects.com/en/2.3.x/deploying/waitress/
- NSFW runs in Flast server, to check for adult content. But it is not an own micro service. https://github.com/GantMan/nsfw_model

Testing can be done also on pythis level with 

### launch backend server
Download the files here https://github.com/AUTOMATIC1111/
Launch stable diffusion:
Switch to the folder of stable diffusion, this will start a backend server withouth fronten WebUI '...\StableDiffusion>python launch.py --nowebui --listen'


Run backend server configuration file to switch the stable diffusion model and make some global settings. '...\PicGenApp\python python/changeBackendSettings.py'

Launch flask server
Stay in the main folder and do not cd into the python folder! '...\PicGenApp\python python/apy.py'

### Firewall settings
TBD

# Helpful Links
Stable diffusion server docs
- local: http://127.0.0.1:7861/docs#/
- some docs on API from Automatic1111: https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API
