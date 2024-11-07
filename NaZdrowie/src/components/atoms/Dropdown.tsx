import { dropdownStyle } from "properties/styles";
import RNPickerSelect from "react-native-picker-select";

export interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  items: DropdownItem[];
  placeholderLabel: string;
  setValue: (string) => void;
}

const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  const { items, placeholderLabel, setValue } = props;

  return (
    <RNPickerSelect
      onValueChange={(value) => setValue(value)}
      style={dropdownStyle}
      items={items}
      placeholder={{
        label: placeholderLabel,
        value: null,
      }}
    />
  );
};

export default Dropdown;
