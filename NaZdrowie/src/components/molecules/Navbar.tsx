import { NavbarDescription, HamburgerMenu } from "components/atoms";
import { navbarStyle } from "properties/styles";
import React from "react";
import { View, Text } from "react-native";

type NavparProps = {
  navbarDescriptionTitle?: string;
};

export const Navbar: React.FC<NavparProps> = (props: NavparProps) => {
  const { navbarDescriptionTitle } = props;

  return (
    <View>
      <View style={navbarStyle.container}>
        <Text style={navbarStyle.text}>Na zdrowie</Text>
        <HamburgerMenu />
      </View>
      <NavbarDescription title={navbarDescriptionTitle} />
    </View>
  );
};
