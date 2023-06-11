
import requests

url = "http://192.168.0.109:7861"
# this will change the model on the backend server
option_payload = {
    #"sd_model_checkpoint": "AnythingV5_v32.safetensors", # switch model
    "sd_model_checkpoint": "animeModel_UpdateV10ImUsing.safetensors", # switch model
}

response = requests.post(url=f'{url}/sdapi/v1/options', json=option_payload)

print(response)