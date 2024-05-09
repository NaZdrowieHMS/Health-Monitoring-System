import { NavbarDescription, HamburgerMenu } from "components/atoms";
import primaryColors from "properties/colors";
import { fontSize, paddingSize } from "properties/vars";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type NavparProps = {
  navbarDescriptionType?: string;
};

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

const Navbar: React.FC<NavparProps> = (props: NavparProps) => {
  const { navbarDescriptionType } = props;

  return (
    <View>
      <View style={navbarStyle.container}>
        <Text style={navbarStyle.text}>Na zdrowie</Text>
        <HamburgerMenu />
      </View>
      <NavbarDescription title={navbarDescriptionType} />
    </View>
  );
};

export default Navbar;
