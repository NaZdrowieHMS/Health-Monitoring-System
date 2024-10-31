import primaryColors from "properties/colors";
import { borderRadiusSize, fontSize, paddingSize } from "properties/vars";
import { StyleSheet } from "react-native";

const cardStyle = StyleSheet.create({
  container: {
    backgroundColor: primaryColors.white,
    flexGrow: 1,
    paddingHorizontal: paddingSize.medium,
    paddingVertical: paddingSize.mediumBig,
    rowGap: paddingSize.mediumBig,
    borderRadius: borderRadiusSize.small,
    // borderColor: primaryColors.gainsboroGrey,
    // borderWidth: 1,                  // to check with IOS!!!
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowColor: primaryColors.black,
    elevation: 3,
  },
  title: {
    fontSize: fontSize.buttonMobileFontSize,
    color: primaryColors.darkBlue,
  },
  key: {
    fontSize: fontSize.buttonMobileFontSize,
    color: primaryColors.darkBlue,
  },
  floatRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
export { cardStyle };
