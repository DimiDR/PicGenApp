# PicGenApp

App to generate Pictures with AI

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

## CORS Problem

https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/3734#discussioncomment-4786786
You're using it wrong.
--cors-allow-origins "localhost"
If that doesn't work, add the port of your frontend.
You can add multiple, separated by commas if i'm not mistaken.
I used this API in 100 requests/hour+ production app in september so I know for sure that it's atleast been working.

You can also use --cors-allow-origins "\*" locally. But in production, use your frontend url.

# download problem

https://stackoverflow.com/questions/74280471/how-to-solve-expo-cli-request-entity-too-large

You can run npm list -g to see which global libraries are installed and where they're located. Use npm list -g | head -1 for truncated output showing just the path. If you want to display only main packages not its sub-packages which installs along with it - you can use - npm list --depth=0 which will show all packages and for getting only globally installed packages, just add -g i.e. npm list -g --depth=0

PayloadTooLargeError: request entity too large
at readStream (C:\Users\Rybak\Desktop\react\PicGenApp\node_modules\raw-body\index.js:163:17)
at getRawBody (C:\Users\Rybak\Desktop\react\PicGenApp\node_modules\raw-body\index.js:116:12)
at read (C:\Users\Rybak\Desktop\react\PicGenApp\node_modules\body-parser\lib\read.js:79:3)
at jsonParser (C:\Users\Rybak\Desktop\react\PicGenApp\node_modules\body-parser\lib\types\json.js:138:5)
at call (C:\Users\Rybak\Desktop\react\PicGenApp\node_modules\connect\index.js:239:7)
at next (C:\Users\Rybak\Desktop\react\PicGenApp\node_modules\connect\index.js:183:5)
at remoteDevtoolsCorsMiddleware (C:\Users\Rybak\Desktop\react\PicGenApp\node_modules\@expo\dev-server\build\middleware\remoteDevtoolsCorsMiddleware.js:36:3)
at call (C:\Users\Rybak\Desktop\react\PicGenApp\node_modules\connect\index.js:239:7)
at next (C:\Users\Rybak\Desktop\react\PicGenApp\node_modules\connect\index.js:183:5)
at serveStatic (C:\Users\Rybak\Desktop\react\PicGenApp\node_modules\serve-static\index.js:75:16)

# take picture from system

https://snack.expo.dev/@kartikeyvaish/document-picker-example

# build APK

https://stackoverflow.com/questions/44301539/react-native-generate-apk-and-ipa-using-expo

https://docs.expo.dev/archive/classic-updates/building-standalone-apps/?redirected
