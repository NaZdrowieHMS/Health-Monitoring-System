import primaryColors from "properties/colors";
import { buttonStyle } from "properties/styles/buttonStyle";
import { ButtonProps } from "properties/types";
import React from "react";
import { Pressable, Text } from "react-native";

export const PrimaryButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { handleOnClick, title, disabled } = props;

  return (
    <Pressable
      disabled={disabled}
      onPress={handleOnClick}
      style={[
        buttonStyle.buttonContainer,
        {
          backgroundColor: !disabled
            ? primaryColors.darkBlue
            : primaryColors.lightGrey,
        },
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
