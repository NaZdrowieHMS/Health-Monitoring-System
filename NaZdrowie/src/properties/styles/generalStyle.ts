import primaryColors from "properties/colors";
import { StyleSheet } from "react-native";

export const generalStyle = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowColor: primaryColors.black,
  },
});
