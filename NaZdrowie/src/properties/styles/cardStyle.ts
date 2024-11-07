import primaryColors from "properties/colors";
import { borderRadiusSize, fontSize, paddingSize } from "properties/vars";
import { StyleSheet } from "react-native";

import { generalStyle } from "./generalStyle";

export const cardStyle = StyleSheet.create({
  container: {
    backgroundColor: primaryColors.white,
    flexGrow: 1,
    paddingHorizontal: paddingSize.medium,
    paddingVertical: paddingSize.mediumBig,
    rowGap: paddingSize.mediumBig,
    borderRadius: borderRadiusSize.small,
    elevation: 3,
    ...generalStyle.shadow,
  },
  title: {
    fontSize: fontSize.buttonFontSize,
    color: primaryColors.darkBlue,
  },
  key: {
    fontSize: fontSize.baseFontSize,
    color: primaryColors.darkBlue,
  },
  floatRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  rowSpread: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardElement: {
    display: "flex",
    flexDirection: "row",
    columnGap: paddingSize.small,
    justifyContent: "space-between",
  },
  elementButtons: {
    display: "flex",
    flexDirection: "row",
    columnGap: paddingSize.xSmall,
  },
});

export const aiResultCardStyle = StyleSheet.create({
  secondaryTitle: {
    fontSize: fontSize.secondaryTitleFontSize,
  },
});

export const commentsCardForDoctorStyle = StyleSheet.create({
  secondaryTitle: {
    fontSize: fontSize.baseFontSize,
    color: primaryColors.darkBlue,
  },
});
