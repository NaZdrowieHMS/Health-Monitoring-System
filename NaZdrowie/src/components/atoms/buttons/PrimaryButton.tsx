import primaryColors from "properties/colors";
import { buttonStyle } from "properties/styles/buttonStyle";
import { ButtonProps } from "properties/types/ButtonProps";
import React from "react";
import { Pressable, Text } from "react-native";

const PrimaryButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { handleOnClick, title } = props;

  return (
    <Pressable
      onPress={handleOnClick}
      style={[
        buttonStyle.buttonContainer,
        { backgroundColor: primaryColors.darkBlue },
      ]}
    >
      <Text style={[buttonStyle.buttonText]}>{title}</Text>
    </Pressable>
  );
};

export default PrimaryButton;
