import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, TextInput, Button, Text } from "react-native";
import Checkbox from "expo-checkbox";
import requests from "requests";
import React, { useState } from "react";
import axios from "axios"; // For making API requests

export default function App() {
  const [generatedImage, setGeneratedImage] = useState();
  const [positivePrompt, setPositivePrompt] = useState(
    "Big Wolf shooting a gun"
  );
  const [negativePrompt, setNegativePrompt] = useState(
    "(worst quality, low quality:2), monochrome, zombie, overexposure, watermark,text,bad anatomy,bad hand,extra hands,extra fingers,too many fingers,fused fingers,bad arm,distorted arm,extra arms,fused arms,extra legs,missing leg,disembodied leg,extra nipples, detached arm, liquid hand,inverted hand,disembodied limb, small breasts, loli, oversized head,extra body,completely nude, extra navel,easynegative,(hair between eyes),sketch, duplicate, ugly, huge eyes, text, logo, worst face, (bad and mutated hands:1.3), (blurry:2.0), horror, geometry, bad_prompt, (bad hands), (missing fingers), multiple limbs, bad anatomy, (interlocked fingers:1.2), Ugly Fingers, (extra digit and hands and fingers and legs and arms:1.4), ((2girl)), (deformed fingers:1.2), (long fingers:1.2),(bad-artist-anime), bad-artist, bad hand, extra legs ,(ng_deepnegative_v1_75t)"
  );
  const [allowAdultContent, setAllowAdultContent] = useState(false);
  const [height, setHeight] = useState(500);
  const [width, setWidth] = useState(500);
  const [loading, setLoading] = useState(false);

  const generatePicture = async () => {
    setLoading(true);
    try {
      // Send the positive, negative prompts, and adult content flag to the backend server
      const response = await axios.post(
        `http://192.168.0.109:7861/sdapi/v1/txt2img`,
        {
          prompt: positivePrompt,
          negative_prompt: negativePrompt,
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

  // const generatePicture = async () => {
  //   const url = "http://127.0.0.1:7861";

  //   const payload = {
  //     prompt: "puppy dog",
  //     steps: 5,
  //   };

  //   const response = await fetch(`${url}/sdapi/v1/txt2img`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(payload),
  //   });

  //   const r = await response.json();
  //   alert(r);
  // };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        placeholder="Enter positive prompt"
        value={positivePrompt}
        onChangeText={(text) => setPositivePrompt(text)}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        placeholder="Enter negative prompt"
        value={negativePrompt}
        onChangeText={(text) => setNegativePrompt(text)}
        style={{ marginBottom: 10 }}
      />
      {generatedImage && (
        <Image
          source={{ uri: `data:image/png;base64,${generatedImage}` }}
          boxShadow="lg"
          // source={{ generatedImage }}
          style={{ width: width, height: width }}
        />
      )}
      <Button title="Generate Picture" onPress={generatePicture} />
      <Text style={styles.label}>Allow Adult Content!</Text>
      <Checkbox
        value={allowAdultContent}
        onValueChange={setAllowAdultContent}
        style={styles.checkbox}
      />
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
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
