import HamburgerMenu from "components/atoms/HamburgerMenu";
import NavbarDescription from "components/atoms/NavbarDescription";
import primaryColors from "properties/colors";
import { fontSize, paddingSize } from "properties/vars";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const navbarStyle = StyleSheet.create({
  container: {
    paddingHorizontal: paddingSize.medium,
    paddingVertical: paddingSize.mediumBig,
    backgroundColor: primaryColors.white,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: fontSize.h2MobileFontSize,
    color: primaryColors.darkBlue,
  },
});

function Navbar() {
  return (
    <View>
      <View style={navbarStyle.container}>
        <Text style={navbarStyle.text}>Na zdrowie</Text>
        <HamburgerMenu />
      </View>
      <NavbarDescription />
    </View>
  );
}

export default Navbar;
