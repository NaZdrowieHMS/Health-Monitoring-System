import primaryColors from "properties/colors";
import { fontSize, paddingSize } from "properties/vars";
import React from "react";
import { Text, StyleSheet } from "react-native";

type NavbarDescriptionProps = {
  title?: string;
};

const navbarDescriptionStyle = StyleSheet.create({
  text: {
    paddingHorizontal: paddingSize.medium,
    paddingVertical: paddingSize.mediumBig,
    backgroundColor: primaryColors.darkBlue,
    fontSize: fontSize.buttonMobileFontSize,
    color: primaryColors.white,
  },
});

const NavbarDescription: React.FC<NavbarDescriptionProps> = (
  props: NavbarDescriptionProps,
) => {
  const { title } = props;

  return title ? (
    <Text style={navbarDescriptionStyle.text}>{title}</Text>
  ) : (
    <></>
  );
};

export default NavbarDescription;
