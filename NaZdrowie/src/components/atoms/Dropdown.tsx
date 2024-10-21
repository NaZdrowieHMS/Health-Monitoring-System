import primaryColors from "properties/colors";
import { paddingSize, borderRadiusSize, fontSize } from "properties/vars";
import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const styles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    padding: paddingSize.medium,
    borderRadius: borderRadiusSize.medium,
    fontSize: fontSize.baseMobileFontSize,
    color: primaryColors.darkGrey,
    borderColor: primaryColors.lightGrey,
  },
  inputAndroid: {
    borderWidth: 1,
    padding: paddingSize.medium,
    borderRadius: borderRadiusSize.medium,
    fontSize: fontSize.baseMobileFontSize,
    color: primaryColors.darkGrey,
    borderColor: primaryColors.lightGrey,
  },
});

export interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  items: DropdownItem[];
  placeholderLabel: string;
}

const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  const { items, placeholderLabel } = props;

  return (
    <RNPickerSelect
      onValueChange={(value) => console.log(value)}
      style={styles}
      items={items}
      placeholder={{
        label: placeholderLabel,
        value: null,
      }}
    />
  );
};

export default Dropdown;
