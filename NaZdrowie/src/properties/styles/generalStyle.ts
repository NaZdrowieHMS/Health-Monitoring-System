import primaryColors from "properties/colors";
import { fontSize } from "properties/vars";
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
  basicText: {
    color: primaryColors.darkGrey,
    fontSize: fontSize.baseFontSize,
  },
  titleText: {
    fontSize: fontSize.titleFontSize,
    color: primaryColors.darkBlue,
  },
  keyText: {
    fontSize: fontSize.baseFontSize,
    color: primaryColors.darkBlue,
  },
  secondaryTitle: {
    fontSize: fontSize.secondaryTitleFontSize,
    color: primaryColors.darkBlue,
  },
});
