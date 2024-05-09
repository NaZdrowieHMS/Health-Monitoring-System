import { FontWeight } from "properties/vars";
import { ButtonProps } from "react-native";

type ListCardElement = {
  text: string;
  buttons: React.ReactElement<
    ButtonProps & { color: string; fontWeight?: FontWeight }
  >[];
};

export type ListCardProps = {
  title: string;
  data: ListCardElement[];
};
