import primaryColors from "properties/colors";
import { fontSize, paddingSize } from "properties/vars";
import { StyleSheet } from "react-native";

export const mainStyle = StyleSheet.create({
  container: {
    backgroundColor: primaryColors.babyBlue,
    paddingHorizontal: paddingSize.medium,
    paddingVertical: paddingSize.mediumBig,
    rowGap: paddingSize.mediumBig,
  },
  buttonContainer: {
    paddingHorizontal: paddingSize.mediumBig,
    rowGap: paddingSize.small,
  },
});

export const navbarStyle = StyleSheet.create({
  container: {
    paddingHorizontal: paddingSize.medium,
    paddingVertical: paddingSize.mediumBig,
    backgroundColor: primaryColors.white,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: fontSize.h2FontSize,
    color: primaryColors.darkBlue,
  },
  navbarDescriptionText: {
    paddingHorizontal: paddingSize.medium,
    paddingVertical: paddingSize.mediumBig,
    backgroundColor: primaryColors.darkBlue,
    fontSize: fontSize.buttonFontSize,
    color: primaryColors.white,
  },
});
