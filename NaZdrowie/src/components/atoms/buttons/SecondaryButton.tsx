import primaryColors from "properties/colors";
import { buttonStyle } from "properties/styles";
import { ButtonProps } from "properties/types";
import React from "react";
import { Pressable, Text } from "react-native";

export const SecondaryButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { handleOnClick, title } = props;

  return (
    <Pressable
      onPress={handleOnClick}
      style={[
        buttonStyle.buttonContainer,
        { backgroundColor: primaryColors.lightBlue },
      ]}
    >
      <Text style={buttonStyle.buttonText}>{title}</Text>
    </Pressable>
  );
};
