import {
  PersonalizedCheckbox,
  PersonalizedTextInput,
  PrimaryButton,
} from "components/atoms";
import primaryColors from "properties/colors";
import { cardStyle } from "properties/styles";
import { HealthFormItemType, HealthFormProps } from "properties/types";
import { fontSize, paddingSize } from "properties/vars";
import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";

import Overlay from "./Overlay";

const healthFormStyle = StyleSheet.create({
  text: {
    fontSize: fontSize.secondaryTitleFontSize,
    color: primaryColors.darkBlue,
  },
});

const HealthFormFillOverlay: React.FC<{
  healthFormData: HealthFormProps;
  isVisible: boolean;
  handleClose: () => void;
}> = ({ isVisible, handleClose, healthFormData }) => {
  return (
    <Overlay isVisible={isVisible}>
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
                <Text style={healthFormStyle.text}>{item.title}</Text>
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

export default HealthFormFillOverlay;
