import { Checkbox } from "expo-checkbox";
import primaryColors from "properties/colors";
import React from "react";

export const PersonalizedCheckbox: React.FC<{
  checkboxValue: boolean;
  handleValueChange: (boolean) => void;
}> = ({ checkboxValue, handleValueChange }) => {
  return (
    <Checkbox
      color={primaryColors.lightGreen}
      value={checkboxValue}
      onValueChange={handleValueChange}
    />
  );
};
