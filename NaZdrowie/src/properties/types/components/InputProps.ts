import React from "react";
import { IconButtonProps } from ".";

export type InputProps = {
  placeholder?: string;
  iconButton?: React.ReactElement<IconButtonProps>;
  inputInsideText?: string;
  onChange?: (value: string) => void;
  value?: string;
  error?: string;
};
