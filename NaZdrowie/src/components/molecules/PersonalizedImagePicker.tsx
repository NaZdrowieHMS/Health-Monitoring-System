import { PrimaryButton } from "components/atoms";
import * as ImagePicker from "expo-image-picker";
import { generalStyle, imagePickerStyle } from "properties/styles";
import { fontSize } from "properties/vars";
import React from "react";
import { View, Text } from "react-native";

export const PersonalizedImagePicker: React.FC<{
  setBase64Data: (string) => void;
  setContentType: (string) => void;
}> = ({ setBase64Data, setContentType }) => {
  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
    });

    if (!result.canceled) {
      setBase64Data(result.assets[0].base64);
      setContentType(result.assets[0].mimeType);
    }
  };

  return (
    <View style={imagePickerStyle.input}>
      <Text style={generalStyle.basicText}>Wynik badania</Text>
      <PrimaryButton
        title="Załącz plik"
        handleOnClick={selectImage}
        fontSize={fontSize.baseFontSize}
      />
    </View>
  );
};
