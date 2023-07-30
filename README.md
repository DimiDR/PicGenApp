# PicGenApp

React Navite app to generate pictures with AI stable diffusion.
It runs on your local system and not on a cloud server.

![Alt text](/assets/AppExampleSmall.jpg "App Screenshot")

## Frontend
React Native not yet optimized for IOS or Android.
Runs on https://expo.dev/
- Start Android Studio and stand an Android Emulator
- 

## Backend
Pathon with multiple servers. Runs on local system. Graphic card user GTX 1080 TI.
- Stable Diffusion server loaded with Automatic1111 package. https://github.com/AUTOMATIC1111/
- Flask Server to have a customizable server leyer on top of stable diffusion. Stable diffusion server will be in standard and updated by Automatic1111. "Waitress" for production WSGI server to the internet. https://flask.palletsprojects.com/en/2.3.x/deploying/waitress/, you need Python 3.10 for the waitress support, since waitress 2.1.0 release
- NSFW Detector runs in Flast server, to check for adult content. But it is not an own micro service. It uses code and model of GantMan, however coding was adjusted to fit the requirenments. https://github.com/GantMan/nsfw_model


Testing can be done also on pythis level with the files test_flask.py and test_stablediffusion.py.

### launch backend servers
Download the files here https://github.com/AUTOMATIC1111/
Launch stable diffusion:
- install reuirenments: ...\PicGenApp\python> pip install -r requirements.txt
- Switch to the folder of stable diffusion, this will start a backend server withouth fronten WebUI '...\StableDiffusion>python launch.py --nowebui --listen'
- Run backend server configuration file to switch the stable diffusion model and make some global settings. '...\PicGenApp\python backEnd/changeBackenSettings.py'

Launch flask server
- Stay in the main folder and do not cd into the python folder! '...\PicGenApp>python backEnd/api.py'

### Firewall settings
TBD

# Helpful Links
Stable diffusion server docs
- local: http://127.0.0.1:7861/docs#/
- some docs on API from Automatic1111: https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API

# Known Errors
- For NSFW Detector: TF installation can be checked here: https://www.tensorflow.org/install/pip#windows-native I have some limitation, as I am running on Windows Native
- For NSFW Detector: If this happens: "OSError: SavedModel file does not exist at: C:\Users\XXXX\AppData\Local\Temp\tfhub_modules\2da11c2dXXXX728da8063a4bd\{saved_model.pbtxt|saved_model.pb}" go to this folder and remove the folder "2da11c2dXXXX728da8063a4bd". The system will regenerate it.
- expo debugger  - add to app.json ""expo":...,{"jsEngine": "jsc", ...}" , run in degbug mode - how?