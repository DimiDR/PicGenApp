
import requests

url = "http://192.168.0.109:7861"
# this will change the model on the backend server
option_payload = {
    "sd_model_checkpoint": "AnythingV5_v32.safetensors",
}

response = requests.post(url=f'{url}/sdapi/v1/options', json=option_payload)

print(response)