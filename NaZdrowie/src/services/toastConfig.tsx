import primaryColors from "properties/colors";
import { BaseToast, ToastConfig } from "react-native-toast-message";

export const toastConfig: ToastConfig = {
  info: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: primaryColors.darkBlue, flexShrink: 1 }}
    />
  ),
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: primaryColors.lightGreen, flexShrink: 1 }}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: primaryColors.red, flexShrink: 1 }}
    />
  ),
};
