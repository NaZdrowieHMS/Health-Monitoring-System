import AntDesign from "@expo/vector-icons/AntDesign";
import { GestureResponderEvent } from "react-native";

export interface ButtonProps {
  handleOnClick?: (event: GestureResponderEvent) => void;
  title: string;
  helperText?: string;
  helperTextColor?: string;
  fontSize?: number;
  disabled?: boolean;
}

export interface IconButtonProps {
  type: keyof typeof AntDesign.glyphMap;
  handleOnClick?: (event: GestureResponderEvent) => void;
  size?: number;
  color?: string;
}
