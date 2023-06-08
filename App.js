import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image, TextInput, Button, Text } from "react-native";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import axios from "axios"; // For making API requests

export default function App() {
  const [generatedImage, setGeneratedImage] = useState(
    "https://picsum.photos/200/300"
  );
  const [positivePrompt, setPositivePrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [allowAdultContent, setAllowAdultContent] = useState(false);

  const generatePicture = async () => {
    try {
      // Send the positive, negative prompts, and adult content flag to the backend server
      const response = await axios.post("YOUR_BACKEND_API_URL", {
        positivePrompt,
        negativePrompt,
        allowAdultContent,
      });

      // Get the generated picture URL from the server response
      const { generatedPicture } = response.data;

      // Update the state with the generated picture
      setGeneratedImage(generatedPicture);
    } catch (error) {
      console.error("Error generating picture:", error);
    }
  };

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
