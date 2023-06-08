import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, TextInput, Button, Text } from "react-native";
import Checkbox from "expo-checkbox";
import requests from "requests";
import React, { useState } from "react";
import axios from "axios"; // For making API requests

export default function App() {
  const [generatedImage, setGeneratedImage] = useState(
    "https://picsum.photos/200/300"
  );
  const [positivePrompt, setPositivePrompt] = useState("Big");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [allowAdultContent, setAllowAdultContent] = useState(false);
  const [image, setImage] = useState();
  const [prompt, setPrompt] = useState();
  const [loading, setLoading] = useState(false);

  const generatePicture = async () => {
    setLoading(true);
    setPrompt("Dimitri");
    try {
      payload = {
        prompt: "maltese puppy",
        steps: 5,
      };
      // Send the positive, negative prompts, and adult content flag to the backend server
      const response = await axios.post(
        `http://127.0.0.1:7861/sdapi/v1/txt2img?prompt=${positivePrompt}`
        // {
        //   positivePrompt,
        //   negativePrompt,
        //   allowAdultContent,
        // }
      );

      // Get the generated picture URL from the server response
      const { generatedPicture } = response.data;

      // set the state with the generated picture
      setGeneratedImage(generatedPicture);
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
          source={{ uri: generatedImage }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <Button title="Generate Picture" onPress={generatePicture} />
      <Text style={styles.label}>Allow Adult Content</Text>
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
