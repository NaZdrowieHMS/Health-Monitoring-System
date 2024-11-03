import { PrimaryButton } from "components/atoms";
import * as ImagePicker from "expo-image-picker";
import primaryColors from "properties/colors";
import { paddingSize, borderRadiusSize, fontSize } from "properties/vars";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingHorizontal: paddingSize.xSmall,
    paddingVertical: paddingSize.xxSmall,
    borderRadius: borderRadiusSize.medium,
    borderColor: primaryColors.lightGrey,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: fontSize.baseMobileFontSize,
    color: primaryColors.darkGrey,
  },
});

const ImagePickerComponent: React.FC<{
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
    <View style={styles.input}>
      <Text style={styles.text}>Wynik badania</Text>
      <PrimaryButton
        title="Załącz plik"
        handleOnClick={selectImage}
        fontSize={fontSize.baseMobileFontSize}
      />
    </View>
  );
};

export default ImagePickerComponent;
