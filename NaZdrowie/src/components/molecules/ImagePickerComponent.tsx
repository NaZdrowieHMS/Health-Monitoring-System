import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { AiResults } from "properties/types/AiDataProps";
import React, { useEffect, useState } from "react";
import { View, Button, Image, Text } from "react-native";
import { getAiPrediction } from "services/aiData";

const ImagePickerComponent = () => {
  const [imageUri, setImageUri] = useState(null);
  const [base64String, setBase64String] = useState(null);
  const [aiData, setAiData] = useState<AiResults | null>(null);

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      convertImageToBase64(result.assets[0].uri);
    }
  };

  const convertImageToBase64 = async (uri) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setBase64String(base64);
    } catch (error) {
      console.log("Error converting image to base64: ", error);
    }
  };

  useEffect(() => {
    if (base64String != null) {
      getAiPrediction(base64String).then((data) => setAiData(data));
    }
  }, [base64String]);

  return (
    <View style={{}}>
      <Button title="Select Image" onPress={selectImage} />
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, margin: 10 }}
        />
      )}
      {base64String && (
        <>
          <Text selectable style={{ margin: 10 }}>
            prediction: {aiData?.prediction}
          </Text>
          <Text selectable style={{ margin: 10 }}>
            confidence: {aiData?.confidence}
          </Text>
        </>
      )}
    </View>
  );
};

export default ImagePickerComponent;
