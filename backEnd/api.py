from flask import Flask, Response, request
import pandas as pd
#import pdfkit
import json
import base64
import time
import requests
from nsfw_detector import predict
from os import listdir
from os.path import isfile, join, exists, isdir, abspath
import os
from flask import send_file
from fuzzywuzzy import fuzz
from waitress import serve
# initialize model once for nsfw_detector
model = predict.load_model('./backEnd/nsfw_detector/model/saved_model.h5')
# model = predict.load_model('./nsfw_detector/model/saved_model.h5')

def submit_post(url: str, data: dict):
    #Submit a POST request to the given URL with the given data.
    return requests.post(url, data=json.dumps(data))

def save_encoded_image(b64_image: str):
    filename = time.strftime("%Y%m%d-%H%M%S") + "_picture.png"
    path = "serverPictures/" + time.strftime("%Y%m%d")
    if not isdir(path):
        os.makedirs(path)
    output_path = "serverPictures/" + time.strftime("%Y%m%d") + "/" + filename
    #Save the given image to the given output path.
    with open(output_path, "wb") as image_file:
        image_file.write(base64.b64decode(b64_image))
    # check NSFW
    isNSFW = nsfw_detector("./" + output_path, path)
    return [isNSFW, path, filename]

def nsfw_detector(image_path:str, path:str):
    # Predict multiple images. Example of array input:
    # return predict.classify(model, ['./serverPictures/hentai_test.jpg', './serverPictures/soft_hentai.png'])
    # Predict single image
    predict_df = predict.classify(model, [image_path])
    hentai = predict_df[image_path]["hentai"]
    porn = predict_df[image_path]["porn"]

    # Logging
    log_info = f"NSFW checked for: {image_path}\n"
    log_info += f"Creation date: {time.strftime('%Y-%m-%d %H:%M:%S')}\n"
    log_info += f"NSFW detection results:\n{predict_df}\n"
    write_log(path, log_info)
    #*******HERE NSFW TRESHHOLDS**********
    if porn > 0.01 or hentai > 0.01:
        return True # explicit content
    else:
        return False # not explicit content

def write_log(image_path: str, log_info:str):
    filename = "1log_" + time.strftime("%Y%m%d") + ".txt"
    log_file_path = os.path.join(image_path, filename)

    # log_info = f"NSFW checked for: {image_path}\n"
    # log_info += f"Creation date: {time.strftime('%Y-%m-%d %H:%M:%S')}\n"
    # log_info += f"NSFW detection results:\n{nsfw_detector}\n"
    # log_info += f"******\n"

    if os.path.exists(log_file_path):
        with open(log_file_path, "a") as log_file:
            log_file.write(log_info)
    else:
        with open(log_file_path, "w") as log_file:
            log_file.write(log_info)
    log_info = ""

def contains_nsfw_words(input_string, threshold=70):
    nsfw_words = [
        "nsfw",
        "explicit",
        "adult",
        "porn",
        "xxx",
        "sexy",
        "sex",
        "naked",
        "erotic",
        "fucking",
        "vagina",
        "penis",
        "dick",
        # Add more NSFW words to this list if needed
    ]
    input_string = input_string.lower()
    for nsfw_word in nsfw_words:
        if fuzz.partial_ratio(nsfw_word.lower(), input_string) >= threshold:
            return True
    return False

#*** Start Service ****
app = Flask(__name__)

@app.route('/', methods=['GET'])
def server_test():
    return "Server is running"

@app.route('/gettext2img', methods=['GET'])
def text2img():
    nsfw_neg_prompt = "(nsfw:1), (fucking:1), (naked:1), (sex:1), vagina, (worst quality, low quality:1.4), monochrome, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, deformed eyes, ((disfigured)), bad art, deformed, ((extra limbs)), ((duplicate)), morbid, multilated, bad body, on hand with less than 5 fingers, crown , stacked torses, stacked hands, totem pole"
    safe_neg_prompt = "(worst quality, low quality:1.4), monochrome, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, deformed eyes, ((disfigured)), bad art, deformed, ((extra limbs)), ((duplicate)), morbid, multilated, bad body, on hand with less than 5 fingers, crown , stacked torses, stacked hands, totem pole"
    txt2img_url = 'http://192.168.0.109:7861/sdapi/v1/txt2img'
    data = {'prompt': 'fucking, nsfw, big tits, naked, (white background:1.5),::5] (isometric:1.0), double exposure, bubble, mid shot, full body, masterpiece, best quality, ((2girls)), (colorful),(finely detailed beautiful eyes and detailed face),cinematic lighting,bust shot,extremely detailed CG unity 8k wallpaper,black hair,long hair,black eyes,solo,smile,intricate skirt,((flying petal)),(Flowery meadow) sky, cloudy_sky, building, moonlight, moon, night, (dark theme:1.3), light, fantasy,looking at viewer',
            'negative_prompt': safe_neg_prompt,
            'width': 512,
            'height': 512,
            'steps': 10}
    response = submit_post(txt2img_url, data)
    # save pictures in subfolders on date level
    isNSFW, output_file_path = save_encoded_image(response.json()['images'][0])
    if isNSFW:
        write_log(output_file_path, "Picture created in " + output_file_path + ". It is NOT APPROPRIATE.")
        return "Picture created in " + output_file_path + ". It is NOT APPROPRIATE."
    else:
        write_log(output_file_path, "Picture created in " + output_file_path + ". It is appropriate.")
        return "Picture created in " + output_file_path + ". It is appropriate."

@app.route('/posttext2img', methods=['POST'])
def posttext2img():
    nsfw_neg_prompt = "(nsfw:1), (fucking:1), (naked:1), (sex:1), vagina, (worst quality, low quality:1.4), monochrome, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, deformed eyes, ((disfigured)), bad art, deformed, ((extra limbs)), ((duplicate)), morbid, multilated, bad body, on hand with less than 5 fingers, crown , stacked torses, stacked hands, totem pole"
    safe_neg_prompt = "(worst quality, low quality:1.4), monochrome, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, deformed eyes, ((disfigured)), bad art, deformed, ((extra limbs)), ((duplicate)), morbid, multilated, bad body, on hand with less than 5 fingers, crown , stacked torses, stacked hands, totem pole"

    # Extract the post parameters from the request
    request_data = json.loads(request.data)
    prompt = request_data['prompt']
    width = request_data['width']
    height = request_data['height']
    steps = request_data['steps']

    # check prompt for NSFW
    if contains_nsfw_words(prompt):
        return "there is a NSFW word in the prompt"

    # Construct the data payload for the POST request
    data = {
        'prompt': prompt,
        'negative_prompt': nsfw_neg_prompt,
        'width': width,
        'height': height,
        'steps': steps
    }

    # Make the POST request to the desired URL
    txt2img_url = 'http://192.168.0.109:7861/sdapi/v1/txt2img'
    response = submit_post(txt2img_url, data)

    # save pictures in subfolders on date level
    isNSFW, output_file_path, filename = save_encoded_image(response.json()['images'][0])
    if isNSFW:
        return "Picture created in " + output_file_path + ". It is NOT APPROPRIATE. File:" + filename
    else:
        return "Picture created in " + output_file_path + ". It is appropriate.. File:" + filename

if __name__ == '__main__':
    serve(app, port=5005)
    # serve(app, port=5005, threads=2)
    # app.run(debug=True, port=5005)

# # run flask
# app.run(port=5005)
