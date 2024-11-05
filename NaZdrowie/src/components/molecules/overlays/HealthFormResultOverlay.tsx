import primaryColors from "properties/colors";
import { HealthFormDisplayData } from "properties/types";
import { fontSize } from "properties/vars";
import React from "react";
import { StyleSheet } from "react-native";
import { formatDate } from "services/utils";

import { Overlay } from "./Overlay";
import ObjectCard from "../cards/ObjectCard";

const cardStyle = StyleSheet.create({
  key: {
    fontSize: fontSize.baseMobileFontSize,
    color: primaryColors.darkBlue,
  },
});

export const HealthFormResultOverlay: React.FC<{
  isVisible: boolean;
  handleClose: () => void;
  healthFormData: HealthFormDisplayData;
}> = ({ isVisible, handleClose, healthFormData }) => {
  return (
    <Overlay isVisible={isVisible}>
      <Overlay.Container>
        <Overlay.Header
          title={"Formularz zdrowia " + formatDate(healthFormData.createDate)}
          handleClose={handleClose}
        />
        <Overlay.Body>
          <ObjectCard data={healthFormData.content} keyStyle={cardStyle.key} />
        </Overlay.Body>
        <Overlay.Footer />
      </Overlay.Container>
    </Overlay>
  );
};
