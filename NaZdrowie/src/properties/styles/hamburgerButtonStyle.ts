import { StyleSheet } from "react-native";
import primaryColors from "properties/colors";

export const HamburgerButtonStyle = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    padding: 0,
  },
  button: {
    position: "relative",
    width: 20,
    height: 20,
    backgroundColor: primaryColors.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "column",
  },
  rowStart: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rowEnd: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  blueBar: {
    height: 6,
    borderRadius: 4,
    backgroundColor: primaryColors.darkBlue,
  },
  blueBarMarginBottom: {
    marginBottom: 6,
  },
  blueBarMarginTop: {
    marginTop: 6,
  },
  wideBar: {
    width: 40,
  },
  narrowBar: {
    width: 20,
  },
});
