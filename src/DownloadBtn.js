import { View, Button, Platform } from "react-native";
import { shareAsync } from "expo-sharing"; // saving for on ios
import * as FileSystem from "expo-file-system"; // saving for on android

const DownloadBtn = ({ generatedImage }) => {
  const handleSaveImage = async () => {
    const uri = generatedImage;
    const filename = "generatedImg";
    const mimetype = "image/png";
    if (generatedImage) {
      if (Platform.OS === "android") {
        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            filename,
            mimetype
          )
            .then(async (uri) => {
              await FileSystem.writeAsStringAsync(uri, generatedImage, {
                encoding: FileSystem.EncodingType.Base64,
              });
            })
            .catch((e) => console.log(e));
        } else {
          shareAsync(uri);
        }
      } else {
        shareAsync(uri);
      }
    }
  };

  return (
    <View>
      <Button title="Save" onPress={handleSaveImage} />
    </View>
  );
};

export default DownloadBtn;
