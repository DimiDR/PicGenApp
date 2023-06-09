import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, TextInput, Button, Text } from "react-native";
import Checkbox from "expo-checkbox";
import requests from "requests";
import React, { useState } from "react";
import axios from "axios"; // For making API requests

export default function App() {
  const [generatedImage, setGeneratedImage] = useState();
  const [positivePrompt, setPositivePrompt] = useState(
    "(masterpiece, best quality:1.2), illustration, absurdres, highres, extremely detailed, 1 petite girl, white short hair, rabbit ears, red eyes, eye highlights, dress, short puffy sleeves, frills, outdoors, flower, fluttering petals, upper body, (moon:1.2), night, depth of field, (:d:0.8), chromatic aberration abuse,pastel color, Depth of field,garden of the sun,shiny,Purple tint,(Purple fog:1.3)"
  );
  const [negativePrompt, setNegativePrompt] = useState(
    "(worst quality, low quality, blurry:1.66), (bad hand:1.4), watermark, (greyscale:0.88), multiple limbs, (deformed fingers, bad fingers:1.2), (ugly:1.3), monochrome, horror, geometry, bad anatomy, bad limbs, (Blurry pupil), (bad shading), error, bad composition, Extra fingers, strange fingers, Extra ears, extra leg, bad leg, disability, Blurry eyes, bad eyes, Twisted body, confusion, (bad legs:1.3)"
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
