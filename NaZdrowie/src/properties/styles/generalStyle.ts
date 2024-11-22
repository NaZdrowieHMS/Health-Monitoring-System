import primaryColors from "properties/colors";
import { fontSize } from "properties/vars";
import { Platform, StatusBar, StyleSheet } from "react-native";

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
  rowSpread: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  safeArea: {
    flex: 1,
    backgroundColor: primaryColors.babyBlue,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
