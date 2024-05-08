import primaryColors from "properties/colors";
import { fontSize, paddingSize } from "properties/vars";
import React from "react";
import { Text, StyleSheet } from "react-native";

const navbarDescriptionStyle = StyleSheet.create({
  text: {
    paddingHorizontal: paddingSize.medium,
    paddingVertical: paddingSize.mediumBig,
    backgroundColor: primaryColors.darkBlue,
    fontSize: fontSize.buttonMobileFontSize,
    color: primaryColors.white,
  },
});

function NavbarDescription() {
  // TODO blue navigation under main navbar
  return <Text style={navbarDescriptionStyle.text}>Aktywne konwersacje</Text>;
}

export default NavbarDescription;
