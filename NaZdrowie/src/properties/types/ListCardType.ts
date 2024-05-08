import { LinkButton } from "components/atoms";

type ListCardElement = {
  text: string;
  button: typeof LinkButton;
};

export type ListCardType = {
  title: string;
  data: ListCardElement[];
};
