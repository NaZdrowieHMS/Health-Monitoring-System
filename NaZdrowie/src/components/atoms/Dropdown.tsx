import { inputStyle } from "properties/styles";
import React from "react";
import RNPickerSelect from "./RNPickerSelect";
import primaryColors from "properties/colors";

export interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  items: DropdownItem[];
  placeholderLabel: string;
  setValue: (string) => void;
}

export const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  const { items, placeholderLabel, setValue } = props;

  return (
    <RNPickerSelect
      onValueChange={(value) => setValue(value)}
      style={inputStyle}
      items={items}
      placeholder={{
        label: placeholderLabel,
        value: null,
        color: primaryColors.darkGrey,
      }}
    />
  );
};
