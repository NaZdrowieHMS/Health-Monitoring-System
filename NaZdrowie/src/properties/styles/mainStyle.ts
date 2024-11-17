import primaryColors from "properties/colors";
import { fontSize, paddingSize } from "properties/vars";
import { StyleSheet } from "react-native";

import { generalStyle } from "./generalStyle";

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
    ...generalStyle.rowSpread,
  },
  text: {
    fontSize: fontSize.h2FontSize,
    color: primaryColors.darkBlue,
  },
  navbarDescription: {
    paddingHorizontal: paddingSize.medium,
    paddingVertical: paddingSize.mediumBig,
    backgroundColor: primaryColors.darkBlue,
    ...generalStyle.rowSpread,
  },
  navbarDescriptionText: {
    fontSize: fontSize.titleFontSize,
    color: primaryColors.white,
    lineHeight: fontSize.h2FontSize * 1.5,
  },
});
