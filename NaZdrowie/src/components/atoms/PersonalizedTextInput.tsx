import primaryColors from "properties/colors";
import { inputStyle } from "properties/styles";
import { InputProps } from "properties/types";
import React, { useEffect } from "react";
import { TextInput } from "react-native";

export const PersonalizedTextInput: React.FC<InputProps> = (
  props: InputProps,
) => {
  const { placeholder, onChange } = props;
  const [text, onChangeText] = React.useState("");

  useEffect(() => {
    if (onChange !== undefined) {
      onChange(text);
    }
  }, [text]);

  return (
    <>
      <TextInput
        style={inputStyle.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={placeholder}
        placeholderTextColor={primaryColors.lightGrey}
      />
    </>
  );
};
