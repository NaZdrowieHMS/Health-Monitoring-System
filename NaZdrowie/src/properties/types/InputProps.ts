export type InputProps = {
  placeholder?: string;
  onChange?: (value: ((prevState: string) => string) | string) => void;
};
