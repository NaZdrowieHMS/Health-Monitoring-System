import React from "react";
import { ButtonProps } from "../properties/types/ButtonTypes";
import { Pressable, Text, TouchableOpacity } from "react-native";
import primaryColors from "../properties/colors";
import { buttonStyle } from "../properties/styles/buttonStyle";

function PrimaryButton(_props: ButtonProps) {
  const { handleOnClick, title } = _props;

  return (
    <>
      <Pressable
        onPress={handleOnClick}
        style={[
          buttonStyle.buttonContainer,
          { backgroundColor: primaryColors.darkBlue },
        ]}
      >
        <Text style={[buttonStyle.buttonText]}>{title}</Text>
      </Pressable>
    </>
  );
}

export default PrimaryButton;
