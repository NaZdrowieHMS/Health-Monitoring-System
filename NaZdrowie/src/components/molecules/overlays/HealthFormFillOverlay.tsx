import {
  Dropdown,
  PersonalizedCheckbox,
  PersonalizedTextInput,
  PrimaryButton,
} from "components/atoms";
import { generalStyle } from "properties/styles";
import {
  HealthFormItemType,
  HealthFormProps,
  HealthFormUpdate,
  UserData,
} from "properties/types";
import { paddingSize } from "properties/vars";
import React, { useState } from "react";
import { Text, View } from "react-native";

import { Overlay } from "./Overlay";
import { useSendHealthForm } from "services/patientData";

export const HealthFormFillOverlay: React.FC<{
  currentUser: UserData;
  healthFormData: HealthFormProps;
  handleClose: () => void;
}> = ({ currentUser, handleClose, healthFormData }) => {
  const defaultFormFillData: HealthFormUpdate = {
    patientId: healthFormData.patientId,
    content: healthFormData.content.map((item) => ({
      key: item.title,
      value: item.type == HealthFormItemType.Checkbox ? "false" : "",
    })),
  };

  const [healthFormItems, setHealthFormItems] =
    useState<HealthFormUpdate>(defaultFormFillData);

  const sendFormResult = useSendHealthForm(currentUser);

  // const handleValueChange = (index: string, newValue: any) => {
  //   setHealthFormItems((prevItems) => ({
  //     ...prevItems,
  //     content: prevItems.content.map((item, i) =>
  //       item.key === index ? { ...item, value: newValue } : item,
  //     ),
  //   }));
  // };
  
  // Here I wanted to toggle the value for the checkbox type of values. 
  // The only issue is that I do not know how to insert the value from healthFormItems for each appropriate checkbox
  const handleValueChange = (index: string, newValue?: any) => {
    setHealthFormItems((prevItems) => ({
      ...prevItems,
      content: prevItems.content.map((item, i) =>
        item.key === index ? { ...item, value: newValue ? newValue : (item.value==="false" ? "true" : "false" ) } : item,
      ),
    }));
  };

  const handleSendFormData = () => {
    sendFormResult.mutate(healthFormItems);
    handleClose();
  };

  return (
    <Overlay>
      <Overlay.Container>
        <Overlay.Header
          title="Wypełnij formularz zdrowia"
          handleClose={handleClose}
        />
        <Overlay.Body>
          {healthFormData.content.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection:
                  item.type === HealthFormItemType.Checkbox ? "row" : "column",
                justifyContent: "space-between",
                paddingVertical: paddingSize.xSmall,
              }}
            >
              <Text style={generalStyle.secondaryTitle}>{item.title}</Text>
              {item.type === HealthFormItemType.Input && (
                <View style={{ paddingTop: paddingSize.xxSmall }}>
                  <PersonalizedTextInput
                    placeholder={item.placeholder}
                    onChange={(value) => handleValueChange(item.title, value)}
                  />
                </View>
              )}
              {item.type === HealthFormItemType.Checkbox && (
                <PersonalizedCheckbox
                  checkboxValue={false} // idk how to get the data here
                  // checkboxValue={false}
                  // handleValueChange={(value) => {
                    // handleValueChange(item.title, value.toString());
                    handleValueChange={() => {
                    handleValueChange(item.title);
                  }}
                />
              )}
              {item.type === HealthFormItemType.Dropdown && item.options && (
                <View style={{ paddingTop: paddingSize.xxSmall }}>
                  <Dropdown
                    items={item.options}
                    placeholderLabel={item.placeholder}
                    setValue={(value) => handleValueChange(item.title, value)}
                  />
                </View>
              )}
            </View>
          ))}
        </Overlay.Body>
        <Overlay.Footer>
          <PrimaryButton title="Wyślij" handleOnClick={handleSendFormData} />
        </Overlay.Footer>
      </Overlay.Container>
    </Overlay>
  );
};
