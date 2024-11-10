import { IconButtonProps } from ".";

export type InputProps = {
  placeholder?: string;
  iconButton?: React.ReactElement<IconButtonProps>;
  onChange?: (value: ((prevState: string) => string) | string) => void;
};
