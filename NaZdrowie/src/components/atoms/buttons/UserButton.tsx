import primaryColors from "properties/colors";
import { buttonStyle, generalStyle } from "properties/styles";
import { ButtonProps } from "properties/types";
import { borderRadiusSize, fontSize } from "properties/vars";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export type UserButtonElement = ReturnType<typeof UserButton>;

export const userButtonStyle = StyleSheet.create({
  buttonContainer: {
    backgroundColor: primaryColors.white,
    borderRadius: borderRadiusSize.medium,
    ...generalStyle.shadow,
  },
  onlineText: {
    fontSize: fontSize.baseFontSize,
  },
});

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
            userButtonStyle.onlineText,
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
