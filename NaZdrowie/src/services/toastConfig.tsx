import primaryColors from "properties/colors";
import { generalStyle } from "properties/styles";
import { BaseToast, ToastConfig } from "react-native-toast-message";

export const toastConfig: ToastConfig = {
  info: (props) => (
    <BaseToast
      text2NumberOfLines={0}
      style={{ borderLeftColor: primaryColors.darkBlue, height: "auto" }}
      {...props}
      text1Style={generalStyle.basicText}
      text2Style={generalStyle.smallText}
    />
  ),
  success: (props) => (
    <BaseToast
      text2NumberOfLines={0}
      style={{ borderLeftColor: primaryColors.lightGreen, height: "auto" }}
      {...props}
      text1Style={generalStyle.basicText}
      text2Style={generalStyle.smallText}
    />
  ),
  error: (props) => (
    <BaseToast
      text2NumberOfLines={0}
      style={{ borderLeftColor: primaryColors.red, height: "auto" }}
      {...props}
      text1Style={generalStyle.basicText}
      text2Style={generalStyle.smallText}
    />
  ),
};
