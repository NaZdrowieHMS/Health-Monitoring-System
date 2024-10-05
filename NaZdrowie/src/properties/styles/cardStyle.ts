import primaryColors from "properties/colors";
import { paddingSize, borderRadiusSize, fontSize } from "properties/vars";
import { StyleSheet } from "react-native";

const cardStyle = StyleSheet.create({
  container: {
    backgroundColor: primaryColors.white,
    flexGrow: 1,
    paddingHorizontal: paddingSize.medium,
    paddingVertical: paddingSize.mediumBig,
    rowGap: paddingSize.mediumBig,
    borderRadius: borderRadiusSize.small,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
  },
  title: {
    fontSize: fontSize.buttonMobileFontSize,
    color: primaryColors.darkBlue,
  },
  floatRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default cardStyle;
