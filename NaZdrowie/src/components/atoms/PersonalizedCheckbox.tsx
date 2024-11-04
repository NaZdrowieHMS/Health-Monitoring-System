import { Checkbox } from "expo-checkbox";
import primaryColors from "properties/colors";
import React, { useState } from "react";

const PersonalizedCheckbox: React.FC<{
  checkboxStatus: boolean;
}> = ({ checkboxStatus }: { checkboxStatus: boolean }) => {
  const [isChecked, setChecked] = useState(checkboxStatus);

  return (
    <Checkbox
      color={primaryColors.lightGreen}
      value={isChecked}
      onValueChange={setChecked}
    />
  );
};

export default PersonalizedCheckbox;
