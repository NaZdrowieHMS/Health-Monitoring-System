import primaryColors from "properties/colors";
import { borderRadiusSize, fontSize, paddingSize } from "properties/vars";
import { StyleSheet } from "react-native";

import { generalStyle } from "./generalStyle";

const cardStyle = StyleSheet.create({
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
    fontSize: fontSize.buttonMobileFontSize,
    color: primaryColors.darkBlue,
  },
  key: {
    fontSize: fontSize.baseMobileFontSize,
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
});
export { cardStyle };
