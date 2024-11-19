import { Checkbox } from "expo-checkbox";
import primaryColors from "properties/colors";
import React, { useEffect, useState } from "react";

export const PersonalizedCheckbox: React.FC<{
  checkboxInitialValue: boolean;
  handleValueChange: (boolean) => void;
}> = ({ checkboxInitialValue, handleValueChange }) => {
  const [value, onChangeValue] = useState(checkboxInitialValue);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    if (!isInitial) {
      if (handleValueChange !== undefined) {
        handleValueChange(value);
      }
    } else {
      setIsInitial(false);
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
