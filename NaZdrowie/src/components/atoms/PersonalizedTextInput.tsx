import primaryColors from "properties/colors";
import { generalStyle, inputStyle } from "properties/styles";
import { InputProps } from "properties/types";
import React from "react";
import { TextInput, View, Text } from "react-native";

export const PersonalizedTextInput: React.FC<InputProps> = (
  props: InputProps
) => {
  const { placeholder, iconButton, inputInsideText, onChange, value } = props;

  const handleChangeText = (newText: string) => {
    if (onChange) {
      onChange(newText);
    }
  };

  return (
    <View style={inputStyle.input}>
      <TextInput
        style={{
          flex: 1,
          ...generalStyle.basicText,
        }}
        onChangeText={handleChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={primaryColors.lightGrey}
        multiline={true}
        scrollEnabled={true}
      />
      <Text style={[generalStyle.basicText]}>{inputInsideText}</Text>
      {iconButton}
    </View>
  );
};
