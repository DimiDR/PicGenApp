import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, TextInput, Button, Text } from "react-native";
import Checkbox from "expo-checkbox";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Timer from "./Timer";
import DownloadBtn from "./src/DownloadBtn";

export default function App() {
  const [generatedImage, setGeneratedImage] = useState();
  const [positivePrompt, setPositivePrompt] = useState(
    "[(white background:1.5),::5] (isometric:1.0), double exposure, bubble, mid shot, full body, masterpiece, best quality, ((2girls)), (colorful),(finely detailed beautiful eyes and detailed face),cinematic lighting,bust shot,extremely detailed CG unity 8k wallpaper,black hair,long hair,black eyes,solo,smile,intricate skirt,((flying petal)),(Flowery meadow) sky, cloudy_sky, building, moonlight, moon, night, (dark theme:1.3), light, fantasy,looking at viewer"
  );
  // "[(white background:1.5),::5] (isometric:1.0), double exposure, bubble, mid shot, full body,  masterpiece, best quality, 1girl, (colorful),(finely detailed beautiful eyes and detailed face),cinematic lighting,bust shot,extremely detailed CG unity 8k wallpaper,black hair,long hair,black eyes,solo,smile,intricate skirt,((flying petal)),(Flowery meadow) sky, cloudy_sky, building, moonlight, moon, night, (dark theme:1.3), light, fantasy,looking at viewer"
  // "Highly detailed, High Quality, masterpiece, detailed face, ((2girls)), shenhedef, hutaodef,"
  // "[(white background:1.5),::5] (isometric:1.0), double exposure, bubble, mid shot, full body, // masterpiece, best quality, ((2girls)), (colorful),(finely detailed beautiful eyes and detailed face),cinematic lighting,bust shot,extremely detailed CG unity 8k wallpaper,black hair,long hair,black eyes,solo,smile,intricate skirt,((flying petal)),(Flowery meadow) sky, cloudy_sky, building, moonlight, moon, night, (dark theme:1.3), light, fantasy,looking at viewer"
  const [negativePrompt, setNegativePrompt] = useState(
    "(worst quality, low quality:1.4), monochrome, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, deformed eyes, ((disfigured)), bad art, deformed, ((extra limbs)), ((duplicate)), morbid, multilated, bad body, on hand with less than 5 fingers, crown , stacked torses, stacked hands, totem pole"
  );
  const [allowAdultContent, setAllowAdultContent] = useState(false);
  const [height, setHeight] = useState(512); //1080
  const [width, setWidth] = useState(512); // 566
  const [loading, setLoading] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

  const restartTimer = () => {
    setTimerActive(false);
  };

  const generatePicture = async () => {
    setTimerActive(true);
    // Add NSFW to Neg Prompt if checkmark for Adult Content is checked
    let nsfw_neg_prompt =
      "(nsfw:1), (fucking:1), (naked:1), (sex:1), vagina, " + negativePrompt;
    let neg_prompt = allowAdultContent ? nsfw_neg_prompt : negativePrompt;
    //Call API
    try {
      // Send the positive, negative prompts, and adult content flag to the backend server
      const response = await axios.post(
        `http://192.168.0.109:7861/sdapi/v1/txt2img`,
        {
          prompt: positivePrompt,
          negative_prompt: neg_prompt,
          width: width,
          height: height,
          steps: 50,
        }
      );
      setGeneratedImage(response.data.images[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error generating picture:", error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textInputContainer}>Generate some Images</Text>
      {generatedImage ? (
        <View>
          <Image
            id="myImage"
            source={{ uri: `data:image/png;base64,${generatedImage}` }}
            boxShadow="lg"
            style={{
              width: width / 1.5,
              height: width / 1.5,
              borderRadius: 10,
            }}
          />
          <DownloadBtn
            style={styles.downloadBtn}
            generatedImage={generatedImage}
          />
        </View>
      ) : (
        <Image
          source={require("./assets/example.png")}
          style={{ width: width / 1.5, height: width / 1.5, borderRadius: 10 }}
        />
      )}
      <TextInput
        placeholder="Enter positive prompt"
        value={positivePrompt}
        onChangeText={(text) => setPositivePrompt(text)}
        style={styles.textInputContainer}
        multiline={true}
        numberOfLines={4}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Checkbox
          value={allowAdultContent}
          onValueChange={setAllowAdultContent}
        />
        <Text style={styles.label}>Allow Adult Content</Text>
      </View>

      <Button
        title={!timerActive ? "Generate Picture" : "Waiting"}
        onPress={generatePicture}
        disabled={timerActive}
      />
      <Timer timerActive={timerActive} restartTimer={restartTimer} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInputContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    padding: 5,
  },
  textContainer: {},
  label: {
    margin: 8,
  },
  downloadBtn: {
    margin: 8,
  },
});
