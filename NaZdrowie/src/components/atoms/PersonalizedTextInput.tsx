import primaryColors from "properties/colors";
import { generalStyle, inputStyle } from "properties/styles";
import { InputProps } from "properties/types";
import React, { useEffect } from "react";
import { TextInput, View } from "react-native";

export const PersonalizedTextInput: React.FC<InputProps> = (
  props: InputProps,
) => {
  const { placeholder, iconButton, onChange } = props;
  const [text, onChangeText] = React.useState("");

  useEffect(() => {
    if (onChange !== undefined) {
      onChange(text);
    }
  }, [text]);

  return (
    <View style={inputStyle.input}>
      <TextInput
        style={{
          flexGrow: 1,
          ...generalStyle.basicText,
        }}
        onChangeText={onChangeText}
        value={text}
        placeholder={placeholder}
        placeholderTextColor={primaryColors.lightGrey}
      />
      {iconButton}
    </View>
  );
};
