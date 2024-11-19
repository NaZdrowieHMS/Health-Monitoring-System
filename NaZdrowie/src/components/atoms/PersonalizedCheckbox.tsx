import { Checkbox } from "expo-checkbox";
import primaryColors from "properties/colors";
import React, { useEffect } from "react";

export const PersonalizedCheckbox: React.FC<{
  checkboxValue: boolean;
  handleValueChange: (boolean) => void;
}> = ({ checkboxValue, handleValueChange }) => {
  // const [value, onChangeValue] = React.useState(checkboxValue);

  // useEffect(() => {
  //   if (handleValueChange !== undefined) {
  //     handleValueChange(value);
  //   }
  // }, [value]);

  // aboce commented code just make too much noise and makes the wole app lagging (especially in aiDiagnosis screen)
  return (
    <Checkbox
      color={primaryColors.lightGreen}
      value={checkboxValue}
      onValueChange={handleValueChange}
    />
  );
};
