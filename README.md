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

C:\Users\Rybak\Documents\StableDiffusion>python launch.py --nowebui --cors-allow-origins "\*

## CORS Problem

https://github.com/AUTOMATIC1111/stable-diffusion-webui/discussions/3734#discussioncomment-4786786
You're using it wrong.
--cors-allow-origins "localhost"
If that doesn't work, add the port of your frontend.
You can add multiple, separated by commas if i'm not mistaken.
I used this API in 100 requests/hour+ production app in september so I know for sure that it's atleast been working.

You can also use --cors-allow-origins "\*" locally. But in production, use your frontend url.

# sdapi/v1/txt2img

{
"enable_hr": false,
"denoising_strength": 0,
"firstphase_width": 0,
"firstphase_height": 0,
"hr_scale": 2,
"hr_upscaler": "string",
"hr_second_pass_steps": 0,
"hr_resize_x": 0,
"hr_resize_y": 0,
"hr_sampler_name": "string",
"hr_prompt": "",
"hr_negative_prompt": "",
"prompt": "",
"styles": [
"string"
],
"seed": -1,
"subseed": -1,
"subseed_strength": 0,
"seed_resize_from_h": -1,
"seed_resize_from_w": -1,
"sampler_name": "string",
"batch_size": 1,
"n_iter": 1,
"steps": 50,
"cfg_scale": 7,
"width": 512,
"height": 512,
"restore_faces": false,
"tiling": false,
"do_not_save_samples": false,
"do_not_save_grid": false,
"negative_prompt": "string",
"eta": 0,
"s_min_uncond": 0,
"s_churn": 0,
"s_tmax": 0,
"s_tmin": 0,
"s_noise": 1,
"override_settings": {},
"override_settings_restore_afterwards": true,
"script_args": [],
"sampler_index": "Euler",
"script_name": "string",
"send_images": true,
"save_images": false,
"alwayson_scripts": {}
}
