import { NavbarDescription, HamburgerButton } from "components/atoms";
import { navbarStyle } from "properties/styles";
import React, {useContext} from "react";
import { View, Text } from "react-native";
import {HamburgerMenu} from "components/molecules/HamburgerMenu";
import {HamburgerMenuContext} from "components/organisms/context/HamburgerMenuProvider";

type NavbarProps = {
  navbarDescriptionTitle?: string;
  navigation;
};

export const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const { navbarDescriptionTitle, navigation } = props;
  const { isMenuVisible } = useContext(HamburgerMenuContext);
  return (
    <View>
      <View style={navbarStyle.container}>
        <Text style={navbarStyle.text}>Na zdrowie</Text>
        <HamburgerButton />
      </View>
      {isMenuVisible && <HamburgerMenu navigation={navigation} />}
      <NavbarDescription title={navbarDescriptionTitle} />
    </View>
  );
};
