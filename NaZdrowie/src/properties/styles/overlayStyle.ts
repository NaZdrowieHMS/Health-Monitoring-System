import primaryColors from "properties/colors";
import { borderRadiusSize, paddingSize, fontSize } from "properties/vars";
import { StyleSheet } from "react-native";

import { generalStyle } from "./generalStyle";

export const overlayStyle = StyleSheet.create({
  container: {
    backgroundColor: primaryColors.white,
    borderRadius: borderRadiusSize.small,
    borderWidth: 2,
    borderColor: primaryColors.babyBlue,
    padding: paddingSize.mediumBig,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: paddingSize.medium,
    borderBottomWidth: 1,
    borderBottomRightRadius: borderRadiusSize.small,
    borderBottomColor: primaryColors.lightGrey,
  },
  text: {
    textAlign: "center",
    fontSize: fontSize.buttonFontSize,
    color: primaryColors.darkBlue,
  },
  body: {
    paddingTop: paddingSize.mediumBig,
    justifyContent: "center",
    paddingBottom: paddingSize.mediumBig,
    display: "flex",
    rowGap: paddingSize.mediumBig,
  },
});

export const healthFormFillOverlayStyle = StyleSheet.create({
  text: {
    fontSize: fontSize.secondaryTitleFontSize,
    color: primaryColors.darkBlue,
  },
});

export const healthFormResultOverlayStyle = StyleSheet.create({
  key: {
    fontSize: fontSize.baseFontSize,
    color: primaryColors.darkBlue,
  },
});

export const resultFormOverlayStyle = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: paddingSize.medium,
    borderRadius: borderRadiusSize.medium,
    borderColor: primaryColors.lightGrey,
    ...generalStyle.basicText,
  },
});
