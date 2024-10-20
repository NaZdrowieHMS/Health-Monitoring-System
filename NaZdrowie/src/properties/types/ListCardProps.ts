import { FontWeight } from "properties/vars";
import { ButtonProps, GestureResponderEvent } from "react-native";

type CheckboxElement = {
  checkboxStatus: boolean;
};

export type ListCardElement = {
  checkbox?: CheckboxElement;
  text: string;
  buttons: React.ReactElement<
    ButtonProps & { color: string; fontWeight?: FontWeight }
  >[];
};

export type ListCardProps = {
  title: string;
  data: ListCardElement[];
  handleSeeMore?: (event: GestureResponderEvent) => void;
  extraButton?: React.ReactElement<
    ButtonProps & { color: string; fontWeight?: FontWeight }
  >;
};
