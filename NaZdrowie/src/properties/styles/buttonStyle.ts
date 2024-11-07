import { StyleSheet } from "react-native";

import { generalStyle } from "./generalStyle";
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
    fontSize: fontSize.titleFontSize,
  },
});

export const linkButtonStyle = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: paddingSize.xxSmall,
  },
});

export const userButtonStyle = StyleSheet.create({
  buttonContainer: {
    backgroundColor: primaryColors.white,
    borderRadius: borderRadiusSize.medium,
    ...generalStyle.shadow,
  },
});
