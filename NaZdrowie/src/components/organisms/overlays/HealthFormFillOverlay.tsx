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
  HealthFormUpload,
  UserData,
} from "properties/types";
import { paddingSize } from "properties/vars";
import React, { useState } from "react";
import { Text, View } from "react-native";

import { Overlay } from "./Overlay";
import { useSendHealthForm } from "services/healthFormsData";

export const HealthFormFillOverlay: React.FC<{
  currentUser: UserData;
  healthFormData: HealthFormProps;
  handleClose: () => void;
}> = ({ currentUser, handleClose, healthFormData }) => {
  const defaultFormFillData: HealthFormUpload = {
    patientId: healthFormData.patientId,
    content: healthFormData.content.map((item) => ({
      key: item.title,
      value: item.type == HealthFormItemType.Checkbox ? false : "",
    })),
  };

  const [healthFormItems, setHealthFormItems] =
    useState<HealthFormUpload>(defaultFormFillData);

  const sendFormResult = useSendHealthForm(currentUser);

  const prepareHealthFormItems = (healthForm: HealthFormUpload) => {
    healthForm.content = healthForm.content.filter((item) => item.value);
    // optionally add here padding to data / data verification
    return healthForm;
  };

  const handleValueChange = (index: string, newValue: string | boolean) => {
    setHealthFormItems((prevItems) => ({
      ...prevItems,
      content: prevItems.content.map((item) =>
        item.key === index ? { ...item, value: newValue } : item,
      ),
    }));
  };

  const handleSendFormData = () => {
    sendFormResult.mutate(prepareHealthFormItems(healthFormItems));
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
                  checkboxInitialValue={false}
                  handleValueChange={(value) => {
                    handleValueChange(item.title, value);
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
