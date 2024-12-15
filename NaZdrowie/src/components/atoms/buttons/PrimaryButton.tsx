import primaryColors from "properties/colors";
import { buttonStyle } from "properties/styles";
import { ButtonProps } from "properties/types";
import React from "react";
import { Pressable, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";

export const PrimaryButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { handleOnClick, title, disabled, icon } = props;

  const IconComponent = () => {
    if (icon in AntDesign.glyphMap)
      return (
        <AntDesign
          name={icon as keyof typeof AntDesign.glyphMap}
          size={24}
          color={primaryColors.white}
        />
      );
    else if (icon in Ionicons.glyphMap)
      return (
        <Ionicons
          name={icon as keyof typeof Ionicons.glyphMap}
          size={24}
          color={primaryColors.white}
        />
      );
    else if (icon in MaterialCommunityIcons.glyphMap)
      return (
        <MaterialCommunityIcons
          name={icon as keyof typeof MaterialCommunityIcons.glyphMap}
          size={24}
          color={primaryColors.white}
        />
      );
    else if (icon in Entypo.glyphMap)
      return (
        <Entypo
          name={icon as keyof typeof Entypo.glyphMap}
          size={24}
          color={primaryColors.white}
        />
      );
  };

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
        {
          justifyContent: "center",
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
      {IconComponent()}
    </Pressable>
  );
};
