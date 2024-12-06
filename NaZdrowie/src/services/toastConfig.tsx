import primaryColors from "properties/colors";
import { BaseToast, ToastConfig } from "react-native-toast-message";

export const toastConfig: ToastConfig = {
  info: (props) => (
    <BaseToast {...props} style={{ borderLeftColor: primaryColors.black }} />
  ),
};
