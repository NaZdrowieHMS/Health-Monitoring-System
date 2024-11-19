import { Checkbox } from "expo-checkbox";
import primaryColors from "properties/colors";
import React, { useEffect } from "react";

export const PersonalizedCheckbox: React.FC<{
  checkboxValue: boolean;
  handleValueChange: (boolean) => void;
}> = ({ checkboxValue, handleValueChange }) => {
  const [value, onChangeValue] = React.useState(checkboxValue);

  useEffect(() => {
    if (handleValueChange !== undefined) {
      handleValueChange(value);
    }
  }, [value]);

  return (
    <Checkbox
      color={primaryColors.lightGreen}
      value={value}
      onValueChange={onChangeValue}
    />
  );
};
