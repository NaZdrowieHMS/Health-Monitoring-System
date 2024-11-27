import { StyleProp, TextStyle } from "react-native";

export type ObjectCardElement = {
  key: string;
  value: string | boolean;
};

export type ObjectCardProps = {
  data: ObjectCardElement[];
  keyStyle: StyleProp<TextStyle>;
};
