import { Dropdown, PrimaryButton } from "components/atoms";
import { generalStyle, inputStyle } from "properties/styles";
import { UserData } from "properties/types";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { useSendResult } from "services/resultsData";
import { resultItems } from "services/utils";

import { Overlay } from "./Overlay";
import { PersonalizedImagePicker } from "components/molecules";

export const ResultsFormOverlay: React.FC<{
  currentUser: UserData;
  patientId: number;
  referralId?: number;
  referralTestType?: string;
  handleClose: () => void;
}> = ({
  currentUser,
  patientId,
  referralId,
  referralTestType,
  handleClose,
}) => {
  const [base64Data, setBase64Data] = useState<string>();
  const [dataType, setDataType] = useState<string>();
  const [testType, setTestType] = useState<string>();

  const sendResult = useSendResult(currentUser, !!referralId);

  const handleSendResults = () => {
    sendResult.mutateAsync({
      patientId,
      referralId,
      testType: testType ? testType : referralTestType,
      content: {
        data: base64Data,
        type: dataType,
      },
    }); // here you can define onSuccess, onError and onSettled logic
    handleClose();
  };

  return (
    <Overlay>
      <Overlay.Container>
        <Overlay.Header title="Załącz wyniki" handleClose={handleClose} />
        <Overlay.Body>
          {!referralTestType && (
            <Dropdown
              items={resultItems}
              placeholderLabel="Wybierz typ badania"
              setValue={setTestType}
            />
          )}
          {referralTestType && (
            <Text style={inputStyle.input}>{referralTestType}</Text>
          )}
          <View>
            <PersonalizedImagePicker
              setBase64Data={setBase64Data}
              setContentType={setDataType}
            />
            <Text style={generalStyle.basicText}>
              Dozwolone formaty: png, jpg
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
