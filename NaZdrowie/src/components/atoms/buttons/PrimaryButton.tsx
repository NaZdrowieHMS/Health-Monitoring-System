import primaryColors from "properties/colors";
import { buttonStyle } from "properties/styles/buttonStyle";
import { ButtonProps } from "properties/types";
import React from "react";
import { Pressable, Text } from "react-native";

export const PrimaryButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { handleOnClick, title } = props;

  return (
    <Pressable
      onPress={handleOnClick}
      style={[
        buttonStyle.buttonContainer,
        { backgroundColor: primaryColors.darkBlue },
      ]}
    >
      <Text
        style={[
          buttonStyle.buttonText,
          props.fontSize ? { fontSize: props.fontSize } : {},
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};
