import { Dropdown, PrimaryButton } from "components/atoms";
import { DropdownItem } from "components/atoms/Dropdown";
import primaryColors from "properties/colors";
import { fontSize } from "properties/vars";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { sendResult } from "services/patientData";

import Overlay from "./Overlay";
import ImagePickerComponent from "../ImagePickerComponent";

const ResultsFormOverlay: React.FC<{
  patientId: number;
  refferalId?: number;
  isVisible: boolean;
  handleClose: () => void;
}> = ({ patientId, refferalId, isVisible, handleClose }) => {
  const resultItems: DropdownItem[] = [
    { label: "USG piersi", value: "USG piersi" },
    { label: "Mammografia", value: "Mammografia" },
  ];

  const [base64Data, setBase64Data] = useState<string>();
  const [testType, setTestType] = useState<string>();
  const [resultType, setResultType] = useState<string>();

  const closeAndCleanData = () => {
    setBase64Data(null);
    setResultType(null);
    setTestType(null);
    handleClose();
  };

  const handleSendResults = () => {
    sendResult({
      patientId,
      refferalId,
      testType,
      content: {
        data: base64Data,
        type: resultType,
      },
    });
  };

  return (
    <Overlay isVisible={isVisible}>
      <Overlay.Container>
        <Overlay.Header title="Załącz wyniki" handleClose={closeAndCleanData} />
        <Overlay.Body>
          <Dropdown
            items={resultItems}
            placeholderLabel="Wybierz typ badania"
            setValue={setResultType}
          />
          <View>
            <ImagePickerComponent
              setBase64Data={setBase64Data}
              setContentType={setTestType}
            />
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
          <PrimaryButton
            title="Prześlij"
            disabled={base64Data == null || resultType == null}
            handleOnClick={handleSendResults}
          />
        </Overlay.Footer>
      </Overlay.Container>
    </Overlay>
  );
};

export default ResultsFormOverlay;
