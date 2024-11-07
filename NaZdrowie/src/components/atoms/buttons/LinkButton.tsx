import primaryColors from "properties/colors";
import { generalStyle, linkButtonStyle } from "properties/styles";
import { ButtonProps } from "properties/types";
import { FontWeight } from "properties/vars";
import React from "react";
import { Pressable, Text, View } from "react-native";

export const LinkButton: React.FC<
  ButtonProps & { color?: string; fontWeight?: FontWeight }
> = (props: ButtonProps & { color?: string; fontWeight?: FontWeight }) => {
  const {
    handleOnClick,
    title,
    color,
    fontWeight,
    helperText,
    helperTextColor,
  } = props;

  return (
    <View style={linkButtonStyle.buttonContainer}>
      <Text
        style={[
          generalStyle.basicText,
          { color: helperTextColor || primaryColors.darkGrey },
        ]}
      >
        {helperText}
      </Text>
      <Pressable onPress={handleOnClick}>
        <Text
          style={[
            generalStyle.basicText,
            { color: color || primaryColors.lightBlue, fontWeight },
          ]}
        >
          {title}
        </Text>
      </Pressable>
    </View>
  );
};
