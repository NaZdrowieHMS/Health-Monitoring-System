import primaryColors from "properties/colors";
import { buttonStyle, generalStyle, userButtonStyle } from "properties/styles";
import { ButtonProps } from "properties/types";
import React from "react";
import { Pressable, Text } from "react-native";

export type UserButtonElement = ReturnType<typeof UserButton>;

export const UserButton: React.FC<ButtonProps & { online?: boolean }> = (
  props: ButtonProps & { online?: boolean },
) => {
  const { handleOnClick, title, online } = props;

  return (
    <Pressable
      style={[buttonStyle.buttonContainer, userButtonStyle.buttonContainer]}
      onPress={handleOnClick}
    >
      <Text style={generalStyle.basicText}>{title}</Text>
      {online != null && (
        <Text
          style={[
            generalStyle.basicText,
            {
              color: online
                ? primaryColors.lightGreen
                : primaryColors.lightGrey,
            },
          ]}
        >
          {online ? "online" : "offline"}
        </Text>
      )}
    </Pressable>
  );
};
