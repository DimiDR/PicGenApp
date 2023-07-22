# PicGenApp

React Navite app to generate pictures with AI stable diffusion.

![Alt text](/assets/AppExampleSmall.jpg "App Screenshot")

## Frontend
React Native not yet optimized for IOS or Android.
Runs on https://expo.dev/

## Backend
Pathon with multiple servers. Runs on local system. Graphic card user GTX 1080 TI.
- Stable Diffusion server loaded with Automatic1111 package. https://github.com/AUTOMATIC1111/
- Flask Server to have a customizable server leyer on top of stable diffusion and run stable diffusion as standard to not disturb the updates. "Waitress" for production WSGI server
- NSFW runs in Flast server, to check for adult content. But it is not an own micro service. https://github.com/GantMan/nsfw_model

### launch backend server

Launch stable diffusion:

Switch to the folder of stable diffusion, this will start a backend server withouth fronten WebUI '...\StableDiffusion>python launch.py --nowebui --listen'

Launch flask

Stay in the main folder and do not cd into the python folder! '...\PicGenApp\python python/apy.py'

