import {
  PersonalizedCheckbox,
  PersonalizedTextInput,
  PrimaryButton,
} from "components/atoms";
import { healthFormFillOverlayStyle, cardStyle } from "properties/styles";
import { HealthFormItemType, HealthFormProps } from "properties/types";
import { paddingSize } from "properties/vars";
import React from "react";
import { ScrollView, Text, View } from "react-native";

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
          <ScrollView style={cardStyle.container}>
            {healthFormData.content.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection:
                    item.type === HealthFormItemType.Input ? "column" : "row",
                  justifyContent: "space-between",
                  paddingVertical: paddingSize.xSmall,
                }}
              >
                <Text style={healthFormFillOverlayStyle.text}>
                  {item.title}
                </Text>
                {item.type === HealthFormItemType.Input && (
                  <View style={{ paddingTop: paddingSize.xxSmall }}>
                    <PersonalizedTextInput placeholder={item.placeholder} />
                  </View>
                )}
                {item.type === HealthFormItemType.Choice && (
                  <PersonalizedCheckbox checkboxStatus />
                )}
              </View>
            ))}
          </ScrollView>
        </Overlay.Body>
        <Overlay.Footer>
          <PrimaryButton title="Wyślij" />
        </Overlay.Footer>
      </Overlay.Container>
    </Overlay>
  );
};
