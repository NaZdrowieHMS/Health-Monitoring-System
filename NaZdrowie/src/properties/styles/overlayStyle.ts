import primaryColors from "properties/colors";
import { borderRadiusSize, paddingSize } from "properties/vars";
import { StyleSheet } from "react-native";

import { generalStyle } from "./generalStyle";

export const overlayStyle = StyleSheet.create({
  container: {
    backgroundColor: primaryColors.white,
    borderRadius: borderRadiusSize.small,
    borderWidth: 2,
    borderColor: primaryColors.babyBlue,
    padding: paddingSize.mediumBig,
    maxHeight: "80%",
  },
  header: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: primaryColors.lightGrey,
    ...generalStyle.rowSpread,
  },
  body: {
    rowGap: paddingSize.mediumBig,
    paddingVertical: paddingSize.mediumBig,
  },
  centeredElement: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
