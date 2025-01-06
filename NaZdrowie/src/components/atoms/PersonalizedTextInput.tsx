import primaryColors from "properties/colors";
import { generalStyle, inputStyle } from "properties/styles";
import { InputProps } from "properties/types";
import React, { useCallback, useState } from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import { EyeButton, EyeOffButton } from "./buttons";

export const PersonalizedTextInput: React.FC<InputProps> = (
  props: InputProps,
) => {
  const {
    placeholder,
    iconButton,
    inputInsideText,
    onChange,
    value,
    error,
    isPassword,
  } = props;
  const [isSecure, setIsSecure] = useState(true);
  const handleChangeText = (newText: string) => {
    if (onChange) {
      onChange(newText);
    }
  };
  const toggleSecureText = useCallback(() => {
    setIsSecure((prev) => !prev);
  }, []);
  return (
    <>
      <View style={inputStyle.input}>
        <TextInput
          style={{
            flex: 4,
            ...generalStyle.basicText,
          }}
          onChangeText={handleChangeText}
          value={value}
          placeholder={placeholder}
          secureTextEntry={isPassword ? isSecure : false}
          multiline={!isPassword}
          scrollEnabled={!isPassword}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={toggleSecureText}
            style={{
              flex: 1,
              zIndex: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isSecure ? <EyeOffButton size={32} /> : <EyeButton size={32} />}
          </TouchableOpacity>
        )}
        <Text style={[generalStyle.basicText]}>{inputInsideText}</Text>
        {iconButton}
      </View>
      {error && (
        <Text style={[generalStyle.basicText, { color: primaryColors.red }]}>
          {error}
        </Text>
      )}
    </>
  );
};
