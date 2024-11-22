import { NavbarDescription, HamburgerButton } from "components/atoms";
import { navbarStyle } from "properties/styles";
import React, { useContext } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { HamburgerMenu } from "components/molecules/HamburgerMenu";
import { HamburgerMenuContext } from "components/organisms/context/HamburgerMenuProvider";
import primaryColors from "properties/colors";

type NavbarProps = {
  navbarDescriptionTitle?: string;
  navbarDescriptionSubtitle?: string;
};

export const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const { navbarDescriptionTitle, navbarDescriptionSubtitle } = props;
  const { isMenuVisible } = useContext(HamburgerMenuContext);
  return (
    <SafeAreaView style={{ backgroundColor: primaryColors.white }}>
      <View style={navbarStyle.container}>
        <Text style={navbarStyle.text}>Na zdrowie</Text>
        <HamburgerButton />
      </View>
      {isMenuVisible && <HamburgerMenu />}
      <NavbarDescription
        title={navbarDescriptionTitle}
        subtitle={navbarDescriptionSubtitle}
      />
    </SafeAreaView>
  );
};
