# PicGenApp

react navite app to generate pictures with AI stable diffusion.

![Alt text](relative%20path/assets/AppExample.jpg?raw=true "App Screenshot")

React Native App with:

- One area for picture display
- One area for positiv prompt
- One are for negativ prompt
- One button "Generate Picture"
- One checkmark "allow adult content"

# Links

Stable Diffusion as an API: Make a Person-Removing Microservice
https://towardsdatascience.com/stable-diffusion-as-an-api-5e381aec1f6

Stable Diffusion-Based Image Generation Web Application Using Fast API & React
https://medium.com/geekculture/stable-diffusion-based-image-generation-web-application-using-fast-api-react-d519078567bf

Stable Diffusion web UI
https://github.com/TomJamesPearce/stable-diffusion-webui-api

Reddit: Stable Diffusion WebUI API
https://www.reddit.com/r/StableDiffusion/comments/10o8wa2/stable_diffusion_webui_api/

Stable Diffusion API Docs
https://stablediffusionapi.com/docs/

API Docs Automatic1111
https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API

Basic API Doku
https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/3734

http://127.0.0.1:7860/docs#/

# launch backend server

...\Documents\StableDiffusion>python launch.py --nowebui --cors-allow-origins "\*"

http://127.0.0.1:7861/docs#/

--listen --api --cors-allow-origins=https://www.painthua.com --no-half

...\Documents\StableDiffusion>python launch.py --nowebui --listen --api --cors-allow-origins=\*

python launch.py --nowebui --listen

# Run python test

Start Anaconda VE
CD ...\PicGenApp\StableDiffusion
run: python test.py