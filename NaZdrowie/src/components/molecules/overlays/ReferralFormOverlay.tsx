import {
  Dropdown,
  PersonalizedTextInput,
  PrimaryButton,
} from "components/atoms";
import { generalStyle } from "properties/styles";
import { UserData } from "properties/types";
import { useState } from "react";
import { Text } from "react-native";
import { useUploadReferral } from "services/doctorData";
import { resultItems } from "services/utils";
import React from "react";
import { Overlay } from "./Overlay";

export const ReferralFormOverlay: React.FC<{
  currentUser: UserData;
  patientId: number;
  handleClose: () => void;
}> = ({ currentUser, patientId, handleClose }) => {
  const [testType, setTestType] = useState<string>();
  const [comment, setComment] = useState<string>();

  const uploadReferral = useUploadReferral(currentUser);

  // TODO moze da się jakos lepiej to referralNumber generować
  const uploadReferralAndClose = () => {
    uploadReferral.mutateAsync({
      doctorId: currentUser.id,
      patientId,
      testType,
      referralNumber: new Date().toLocaleDateString(),
      completed: false,
      comment: comment ? comment : "",
    });
    handleClose();
  };

  return (
    <Overlay>
      <Overlay.Container>
        <Overlay.Header title="Wystaw skierowanie" handleClose={handleClose} />
        <Overlay.Body>
          <Dropdown
            items={resultItems}
            placeholderLabel="Wybierz typ badania"
            setValue={setTestType}
          />
          <Text style={generalStyle.secondaryTitle}>
            Komentarz do skierowania
          </Text>
          <PersonalizedTextInput
            placeholder="Wpisz komentarz do skierowania"
            onChange={setComment}
          />
          <PrimaryButton
            title="Wystaw skierowanie"
            handleOnClick={uploadReferralAndClose}
            disabled={testType == null}
          />
        </Overlay.Body>
      </Overlay.Container>
    </Overlay>
  );
};
