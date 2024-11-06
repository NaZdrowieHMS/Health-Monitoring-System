import { Dropdown, PrimaryButton } from "components/atoms";
import { DropdownItem } from "components/atoms/Dropdown";
import primaryColors from "properties/colors";
import { borderRadiusSize, fontSize, paddingSize } from "properties/vars";
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { sendResult } from "services/patientData";

import { Overlay } from "./Overlay";
import ImagePickerComponent from "../ImagePickerComponent";

const resultFormStyle = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: paddingSize.medium,
    borderRadius: borderRadiusSize.medium,
    fontSize: fontSize.baseMobileFontSize,
    color: primaryColors.darkGrey,
    borderColor: primaryColors.lightGrey,
  },
});

export const ResultsFormOverlay: React.FC<{
  patientId: number;
  referralId?: number;
  referralTestType?: string;
  handleClose: () => void;
}> = ({ patientId, referralId, referralTestType, handleClose }) => {
  const resultItems: DropdownItem[] = [
    { label: "USG piersi", value: "USG piersi" },
    { label: "Mammografia", value: "Mammografia" },
  ];

  const [base64Data, setBase64Data] = useState<string>();
  const [dataType, setDataType] = useState<string>();
  const [testType, setTestType] = useState<string>();

  const closeAndCleanData = () => {
    setBase64Data(null);
    setDataType(null);
    setTestType(null);
    handleClose();
  };

  const handleSendResults = () => {
    sendResult({
      patientId,
      referralId,
      testType: testType ? testType : referralTestType,
      content: {
        data: base64Data,
        type: dataType,
      },
    });
    closeAndCleanData();
  };

  return (
    <Overlay>
      <Overlay.Container>
        <Overlay.Header title="Załącz wyniki" handleClose={closeAndCleanData} />
        <Overlay.Body>
          {!referralTestType && (
            <Dropdown
              items={resultItems}
              placeholderLabel="Wybierz typ badania"
              setValue={setTestType}
            />
          )}
          {referralTestType && (
            <Text style={resultFormStyle.input}>{referralTestType}</Text>
          )}
          <View>
            <ImagePickerComponent
              setBase64Data={setBase64Data}
              setContentType={setDataType}
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
            disabled={
              base64Data == null ||
              (testType == null && referralTestType == null)
            }
            handleOnClick={handleSendResults}
          />
        </Overlay.Footer>
      </Overlay.Container>
    </Overlay>
  );
};
