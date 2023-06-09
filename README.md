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

python launch.py --nowebui --listen=192.168.0.109

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

# API Help

[-h] [--update-all-extensions] [--skip-python-version-check]
[--skip-torch-cuda-test] [--reinstall-xformers] [--reinstall-torch]
[--update-check] [--test-server] [--skip-prepare-environment] [--skip-install]
[--data-dir DATA_DIR] [--config CONFIG] [--ckpt CKPT] [--ckpt-dir CKPT_DIR]
[--vae-dir VAE_DIR] [--gfpgan-dir GFPGAN_DIR] [--gfpgan-model GFPGAN_MODEL]
[--no-half] [--no-half-vae] [--no-progressbar-hiding]
[--max-batch-count MAX_BATCH_COUNT] [--embeddings-dir EMBEDDINGS_DIR]
[--textual-inversion-templates-dir TEXTUAL_INVERSION_TEMPLATES_DIR]
[--hypernetwork-dir HYPERNETWORK_DIR] [--localizations-dir LOCALIZATIONS_DIR]
[--allow-code] [--medvram] [--lowvram] [--lowram] [--always-batch-cond-uncond]
[--unload-gfpgan] [--precision {full,autocast}] [--upcast-sampling] [--share]
[--ngrok NGROK] [--ngrok-region NGROK_REGION] [--ngrok-options NGROK_OPTIONS]
[--enable-insecure-extension-access]
[--codeformer-models-path CODEFORMER_MODELS_PATH]
[--gfpgan-models-path GFPGAN_MODELS_PATH]
[--esrgan-models-path ESRGAN_MODELS_PATH]
[--bsrgan-models-path BSRGAN_MODELS_PATH]
[--realesrgan-models-path REALESRGAN_MODELS_PATH]
[--clip-models-path CLIP_MODELS_PATH] [--xformers] [--force-enable-xformers]
[--xformers-flash-attention] [--deepdanbooru] [--opt-split-attention]
[--opt-sub-quad-attention] [--sub-quad-q-chunk-size SUB_QUAD_Q_CHUNK_SIZE]
[--sub-quad-kv-chunk-size SUB_QUAD_KV_CHUNK_SIZE]
[--sub-quad-chunk-threshold SUB_QUAD_CHUNK_THRESHOLD]
[--opt-split-attention-invokeai] [--opt-split-attention-v1]
[--opt-sdp-attention] [--opt-sdp-no-mem-attention]
[--disable-opt-split-attention] [--disable-nan-check]
[--use-cpu USE_CPU [USE_CPU ...]] [--listen] [--port PORT]
[--show-negative-prompt] [--ui-config-file UI_CONFIG_FILE]
[--hide-ui-dir-config] [--freeze-settings]
[--ui-settings-file UI_SETTINGS_FILE] [--gradio-debug]
[--gradio-auth GRADIO_AUTH] [--gradio-auth-path GRADIO_AUTH_PATH]
[--gradio-img2img-tool GRADIO_IMG2IMG_TOOL]
[--gradio-inpaint-tool GRADIO_INPAINT_TOOL]
[--gradio-allowed-path GRADIO_ALLOWED_PATH] [--opt-channelslast]
[--styles-file STYLES_FILE] [--autolaunch] [--theme THEME] [--use-textbox-seed]
[--disable-console-progressbars] [--enable-console-prompts]
[--vae-path VAE_PATH] [--disable-safe-unpickle] [--api] [--api-auth API_AUTH]
[--api-log] [--nowebui] [--ui-debug-mode] [--device-id DEVICE_ID]
[--administrator] [--cors-allow-origins CORS_ALLOW_ORIGINS]
[--cors-allow-origins-regex CORS_ALLOW_ORIGINS_REGEX]
[--tls-keyfile TLS_KEYFILE] [--tls-certfile TLS_CERTFILE]
[--disable-tls-verify] [--server-name SERVER_NAME] [--gradio-queue]
[--no-gradio-queue] [--skip-version-check] [--no-hashing]
[--no-download-sd-model] [--subpath SUBPATH] [--add-stop-route]
