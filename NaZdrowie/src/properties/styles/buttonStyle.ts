import { StyleSheet } from "react-native";

import primaryColors from "../colors";
import { borderRadiusSize, fontSize, paddingSize } from "../vars";

export const buttonStyle = StyleSheet.create({
  buttonContainer: {
    elevation: paddingSize.xSmall,
    borderRadius: borderRadiusSize.big,
    paddingVertical: paddingSize.medium,
    paddingHorizontal: paddingSize.mediumBig,
  },
  buttonText: {
    color: primaryColors.white,
    alignSelf: "center",
    fontSize: fontSize.buttonFontSize,
  },
});

export const linkButtonStyle = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: paddingSize.xxSmall,
  },
  buttonText: {
    fontSize: fontSize.baseFontSize,
  },
});
