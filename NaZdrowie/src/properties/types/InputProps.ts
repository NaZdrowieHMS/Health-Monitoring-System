import React from "react";
import { IconButtonProps } from ".";

export type InputProps = {
  placeholder?: string;
  iconButton?: React.ReactElement<IconButtonProps>;
  onChange?: (value: string) => void;
};
