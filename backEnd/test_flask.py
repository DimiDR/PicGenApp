import json
import base64
import time

import requests


def submit_post(url: str, data: dict):
    """
    Submit a POST request to the given URL with the given data.
    """
    return requests.post(url, data=json.dumps(data))


def save_encoded_image(b64_image: str, output_path: str):
    """
    Save the given image to the given output path.
    """
    with open(output_path, "wb") as image_file:
        image_file.write(base64.b64decode(b64_image))

#TODO recode to flask
if __name__ == '__main__':
    counter = 1
    for _ in range(3):
        print("Started generation: " + str(counter))
        counter = counter + 1
        nsfw_neg_prompt = "(nsfw:1), (fucking:1), (naked:1), (sex:1), vagina, (worst quality, low quality:1.4), monochrome, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, deformed eyes, ((disfigured)), bad art, deformed, ((extra limbs)), ((duplicate)), morbid, multilated, bad body, on hand with less than 5 fingers, crown , stacked torses, stacked hands, totem pole"
        safe_neg_prompt = "(worst quality, low quality:1.4), monochrome, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, deformed eyes, ((disfigured)), bad art, deformed, ((extra limbs)), ((duplicate)), morbid, multilated, bad body, on hand with less than 5 fingers, crown , stacked torses, stacked hands, totem pole"
        pos_prompt = '[(white background:1.5),::5] (isometric:1.0), double exposure, bubble, mid shot, full body, masterpiece, best quality, ((2girls)), (colorful),(finely detailed beautiful eyes and detailed face),cinematic lighting,bust shot,extremely detailed CG unity 8k wallpaper,black hair,long hair,black eyes,solo,smile,intricate skirt,((flying petal)),(Flowery meadow) sky, cloudy_sky, building, moonlight, moon, night, (dark theme:1.3), light, fantasy,looking at viewer'
        # txt2img_url = 'http://192.168.0.109:7861/sdapi/v1/txt2img'
        txt2img_url = 'http://127.0.0.1:5005/posttext2img'
        data = {'prompt': pos_prompt,
                'negative_prompt': safe_neg_prompt,
                'width': 512,
                'height': 512,
                'steps': 30}
        response = submit_post(txt2img_url, data)
        print(response.content)
        # filename = time.strftime("%Y%m%d-%H%M%S") + "_picture.png"
        # save_encoded_image(response.json()['images'][0], "serverPictures/" + filename)