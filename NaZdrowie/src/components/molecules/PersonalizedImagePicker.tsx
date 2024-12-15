import { PrimaryButton } from "components/atoms";
import * as ImagePicker from "expo-image-picker";
import { generalStyle, imagePickerStyle } from "properties/styles";
import { fontSize } from "properties/vars";
import React, { useState } from "react";
import { View, Text, Image } from "react-native";

export const PersonalizedImagePicker: React.FC<{
  setBase64Data: (string) => void;
  setContentType: (string) => void;
}> = ({ setBase64Data, setContentType }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      base64: true,
    });

    if (!result.canceled) {
      setBase64Data(result.assets[0].base64);
      setContentType(result.assets[0].mimeType);
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={imagePickerStyle.input}>
      {!imageUri && (
        <Text style={generalStyle.basicText}>Załącz wynik badania</Text>
      )}
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{
            width: 100,
            height: "100%",
          }}
          resizeMode="contain"
        />
      )}
      <PrimaryButton
        title={!imageUri ? "Załącz plik" : "Zmień plik"}
        handleOnClick={selectImage}
        fontSize={fontSize.baseFontSize}
      />
    </View>
  );
};
