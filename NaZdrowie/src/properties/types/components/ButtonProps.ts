import { GestureResponderEvent } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";

export interface ButtonProps {
  handleOnClick?: (event: GestureResponderEvent) => void;
  title: string;
  helperText?: string;
  helperTextColor?: string;
  fontSize?: number;
  disabled?: boolean;
  icon?:
    | keyof typeof AntDesign.glyphMap
    | keyof typeof Ionicons.glyphMap
    | keyof typeof MaterialCommunityIcons.glyphMap
    | keyof typeof Entypo.glyphMap;
}

export interface IconButtonProps {
  handleOnClick?: (event: GestureResponderEvent) => void;
  size?: number;
  color?: string;
}
