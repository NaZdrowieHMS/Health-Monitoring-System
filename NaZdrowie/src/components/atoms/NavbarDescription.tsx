import { useNavigation } from "@react-navigation/native";
import primaryColors from "properties/colors";
import { navbarStyle } from "properties/styles";
import { fontSize, paddingSize } from "properties/vars";
import React from "react";
import { Pressable, Text, View } from "react-native";

type NavbarDescriptionProps = {
  title?: string;
  subtitle?: string;
  button?: React.JSX.Element;
};

export const NavbarDescription: React.FC<NavbarDescriptionProps> = (
  props: NavbarDescriptionProps,
) => {
  const { title, subtitle, button } = props;

  const { goBack } = useNavigation();

  return title ? (
    <View style={navbarStyle.navbarDescription}>
      <View style={navbarStyle.navbarDescriptionTitle}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: paddingSize.small,
          }}
        >
          <Text style={navbarStyle.navbarDescriptionText}>{title}</Text>
          {button}
        </View>
        {subtitle && (
          <Text style={navbarStyle.navbarDescriptionSubtitleText}>
            {subtitle}
          </Text>
        )}
      </View>
      <Pressable onPress={goBack}>
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
