import { StyleSheet } from "react-native";

import primaryColors from "../colors";
import { fontSize, paddingSize } from "../vars";

export const authenticationScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: paddingSize.big,
    justifyContent: "center",
    rowGap: paddingSize.xxBig,
    backgroundColor: primaryColors.white,
  },
  inputContainer: {
    rowGap: paddingSize.big,
  },
  buttonsContainer: {
    rowGap: paddingSize.xSmall,
  },
  h1: {
    fontSize: fontSize.h1FontSize,
    color: primaryColors.darkBlue,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  h2: {
    fontSize: fontSize.h2FontSize,
    color: primaryColors.darkGrey,
  },
});

export const registerScreenStyle = StyleSheet.create({
  container: {
    paddingHorizontal: paddingSize.big,
    paddingVertical: paddingSize.big,
    rowGap: paddingSize.xxBig,
    backgroundColor: primaryColors.white,
    flexGrow: 1,
    justifyContent: "center",
  },
});
