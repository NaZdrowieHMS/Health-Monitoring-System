import { navbarStyle } from "properties/styles";
import React from "react";
import { Text } from "react-native";

type NavbarDescriptionProps = {
  title?: string;
};

const NavbarDescription: React.FC<NavbarDescriptionProps> = (
  props: NavbarDescriptionProps,
) => {
  const { title } = props;

  return title ? (
    <Text style={navbarStyle.navbarDescriptionText}>{title}</Text>
  ) : (
    <></>
  );
};

export default NavbarDescription;
