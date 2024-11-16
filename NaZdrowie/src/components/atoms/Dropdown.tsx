import { inputStyle } from "properties/styles";
import { Picker } from "@react-native-picker/picker";
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

const Item: any = Picker.Item;

export const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  const { items, placeholderLabel, setValue } = props;

  const [pickerValue, setPickerValue] = React.useState(null);

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
