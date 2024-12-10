import primaryColors from "properties/colors";
import { generalStyle } from "properties/styles";
import { BaseToast, ToastConfig } from "react-native-toast-message";
import { StyleSheet } from "react-native";

const toastStyle = StyleSheet.create({
  default: {
    height: "auto",
  },
  info: {
    borderLeftColor: primaryColors.darkBlue,
  },
  error: {
    borderLeftColor: primaryColors.red,
  },
  success: {
    borderLeftColor: primaryColors.lightGreen,
  },
  defaultContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export const toastConfig: ToastConfig = {
  info: (props) => (
    <BaseToast
      text1NumberOfLines={0}
      text2NumberOfLines={0}
      style={[toastStyle.default, toastStyle.info]}
      contentContainerStyle={toastStyle.defaultContainer}
      {...props}
      text1Style={generalStyle.basicText}
      text2Style={generalStyle.smallText}
    />
  ),
  success: (props) => (
    <BaseToast
      text1NumberOfLines={0}
      text2NumberOfLines={0}
      style={[toastStyle.default, toastStyle.success]}
      contentContainerStyle={toastStyle.defaultContainer}
      {...props}
      text1Style={generalStyle.basicText}
      text2Style={generalStyle.smallText}
    />
  ),
  error: (props) => (
    <BaseToast
      text1NumberOfLines={0}
      text2NumberOfLines={0}
      style={[toastStyle.default, toastStyle.error]}
      contentContainerStyle={toastStyle.defaultContainer}
      {...props}
      text1Style={generalStyle.basicText}
      text2Style={generalStyle.smallText}
    />
  ),
};
