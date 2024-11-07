import primaryColors from "properties/colors";
import { borderRadiusSize, paddingSize } from "properties/vars";
import { StyleSheet } from "react-native";

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
    borderBottomColor: primaryColors.lightGrey,
  },
  body: {
    paddingTop: paddingSize.mediumBig,
    justifyContent: "center",
    paddingBottom: paddingSize.mediumBig,
    display: "flex",
    rowGap: paddingSize.mediumBig,
  },
});
