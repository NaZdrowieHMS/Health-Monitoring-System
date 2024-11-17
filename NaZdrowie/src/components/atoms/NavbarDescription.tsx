import { useNavigation } from "@react-navigation/native";
import primaryColors from "properties/colors";
import { generalStyle, navbarStyle } from "properties/styles";
import { fontSize } from "properties/vars";
import React from "react";
import { Pressable, Text, View } from "react-native";

type NavbarDescriptionProps = {
  title?: string;
};

export const NavbarDescription: React.FC<NavbarDescriptionProps> = (
  props: NavbarDescriptionProps,
) => {
  const { title } = props;

  const navigation = useNavigation();

  return title ? (
    <View style={navbarStyle.navbarDescription}>
      <Text style={navbarStyle.navbarDescriptionText}>{title}</Text>
      <Pressable onPress={navigation.goBack}>
        <Text
          style={{
            fontSize: fontSize.xFontSize,
            color: primaryColors.white,
            lineHeight: fontSize.xFontSize * 1.05,
          }}
        >
          ×
        </Text>
      </Pressable>
    </View>
  ) : (
    <></>
  );
};
