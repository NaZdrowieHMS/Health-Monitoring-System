import { StyleSheet } from "react-native";
import { navbarStyle } from "properties/styles/mainStyle";
import primaryColors from "properties/colors";

export const HamburgerMenuStyle = StyleSheet.create({
  container: {
    ...navbarStyle.container,
    flexDirection: "column",
    rowGap: 10,
    borderTopColor: primaryColors.black,
    borderTopWidth: 1,
  },
});
