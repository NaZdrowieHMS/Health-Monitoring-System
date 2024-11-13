import {
  Dropdown,
  PersonalizedCheckbox,
  PersonalizedTextInput,
  PrimaryButton,
} from "components/atoms";
import { generalStyle } from "properties/styles";
import { HealthFormItemType, HealthFormProps } from "properties/types";
import { paddingSize } from "properties/vars";
import React from "react";
import { Text, View } from "react-native";

import { Overlay } from "./Overlay";

export const HealthFormFillOverlay: React.FC<{
  healthFormData: HealthFormProps;
  handleClose: () => void;
}> = ({ handleClose, healthFormData }) => {
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
                  <PersonalizedTextInput placeholder={item.placeholder} />
                </View>
              )}
              {item.type === HealthFormItemType.Checkbox && (
                <PersonalizedCheckbox checkboxStatus />
              )}
              {item.type === HealthFormItemType.Dropdown && item.options && (
                <View style={{ paddingTop: paddingSize.xxSmall }}>
                  <Dropdown
                    items={item.options}
                    placeholderLabel={item.placeholder}
                    setValue={() => console.log("siema")}
                  />
                </View>
              )}
            </View>
          ))}
        </Overlay.Body>
        <Overlay.Footer>
          <PrimaryButton title="Wyślij" />
        </Overlay.Footer>
      </Overlay.Container>
    </Overlay>
  );
};
