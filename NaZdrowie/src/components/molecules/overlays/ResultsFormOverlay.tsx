import { Dropdown, PrimaryButton } from "components/atoms";
import { DropdownItem } from "components/atoms/Dropdown";
import primaryColors from "properties/colors";
import { fontSize } from "properties/vars";
import React from "react";
import { Text, View } from "react-native";

import Overlay from "./Overlay";
import ImagePickerComponent from "../ImagePickerComponent";

const ResultsFormOverlay: React.FC<{
  isVisible: boolean;
  handleClose: () => void;
}> = ({ isVisible, handleClose }) => {
  const resultItems: DropdownItem[] = [
    { label: "USG piersi", value: "USG piersi" },
    { label: "Mammografia", value: "Mammografia" },
  ];

  return (
    <Overlay isVisible={isVisible}>
      <Overlay.Container>
        <Overlay.Header title="Załącz wyniki" handleClose={handleClose} />
        <Overlay.Body>
          <Dropdown
            items={resultItems}
            placeholderLabel="Wybierz typ badania"
          />
          <View>
            <ImagePickerComponent />
            <Text
              style={{
                color: primaryColors.darkGrey,
                fontSize: fontSize.baseMobileFontSize,
              }}
            >
              Dozwolone formaty: png, jpg, ...
            </Text>
          </View>
        </Overlay.Body>
        <Overlay.Footer>
          <PrimaryButton title="Prześlij" />
        </Overlay.Footer>
      </Overlay.Container>
    </Overlay>
  );
};

export default ResultsFormOverlay;
