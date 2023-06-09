import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, TextInput, Button, Text } from "react-native";
import Checkbox from "expo-checkbox";
import requests from "requests";
import React, { useState } from "react";
import axios from "axios"; // For making API requests

export default function App() {
  const [generatedImage, setGeneratedImage] = useState();
  const [positivePrompt, setPositivePrompt] = useState(
    "(masterpiece, best quality:1.2), close up, illustration, absurdres, highres, extremely detailed, 1 petite girl, white short hair, rabbit ears, red eyes, eye highlights, dress, short puffy sleeves, frills, outdoors, flower, fluttering petals, upper body, (moon:1.2), night, depth of field, (:d:0.8), chromatic aberration abuse,pastel color, Depth of field,garden of the sun,shiny,Purple tint,(Purple fog:1.3)"
  );
  const [negativePrompt, setNegativePrompt] = useState(
    "(worst quality, low quality, blurry:1.66), (bad hand:1.4), watermark, (greyscale:0.88), multiple limbs, (deformed fingers, bad fingers:1.2), (ugly:1.3), monochrome, horror, geometry, bad anatomy, bad limbs, (Blurry pupil), (bad shading), error, bad composition, Extra fingers, strange fingers, Extra ears, extra leg, bad leg, disability, Blurry eyes, bad eyes, Twisted body, confusion, (bad legs:1.3)"
  );
  const [allowAdultContent, setAllowAdultContent] = useState(false);
  const [height, setHeight] = useState(512); //1080
  const [width, setWidth] = useState(512); // 566
  const [loading, setLoading] = useState(false);

  const generatePicture = async () => {
    // Add NSFW to Neg Prompt if checkmark for Adult Content is checked
    const nsfw_neg_prompt =
      "(nsfw:1), (fucking:1), (nacked:1), (sex:1), tits, vagina";
    const neg_prompt =
      "(masterpiece, best quality:1.2), illustration, absurdres, highres, extremely detailed, 1 petite girl, white short hair, rabbit ears, red eyes, eye highlights, dress, short puffy sleeves, frills, outdoors, flower, fluttering petals, upper body, (moon:1.2), night, depth of field, (:d:0.8), chromatic aberration abuse,pastel color, Depth of field,garden of the sun,shiny,Purple tint,(Purple fog:1.3)";
    allowAdultContent
      ? setNegativePrompt(neg_prompt)
      : setNegativePrompt(nsfw_neg_prompt + ", " + neg_prompt);
    // Call API
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

  return (
    <View style={styles.container}>
      {generatedImage ? (
        <Image
          source={{ uri: `data:image/png;base64,${generatedImage}` }}
          boxShadow="lg"
          style={{ width: width / 2, height: width / 2, borderRadius: 10 }}
        />
      ) : (
        <Image
          source={require("./assets/example.png")}
          style={{ width: width / 2, height: width / 2, borderRadius: 10 }}
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
        <Text style={styles.label}>Allow Adult Content!</Text>
      </View>
      <Button title="Generate Picture" onPress={generatePicture} />
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
  label: {
    margin: 8,
  },
});
