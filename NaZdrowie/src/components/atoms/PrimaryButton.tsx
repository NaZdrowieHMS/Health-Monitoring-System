import primaryColors from "properties/colors";
import { buttonStyle } from "properties/styles/buttonStyle";
import { ButtonProps } from "properties/types/ButtonTypes";
import React from "react";
import { Pressable, Text } from "react-native";

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
