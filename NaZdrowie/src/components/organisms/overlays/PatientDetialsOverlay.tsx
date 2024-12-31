import { PatientData } from "properties/types";
import React from "react";

import { Overlay } from "./Overlay";
import { ObjectCard } from "components/molecules/cards";
import { parsePeselToDateOfBirth } from "services/utils";

export const PatientDetailsOverlay: React.FC<{
  handleClose: () => void;
  patient: PatientData;
  button?: React.JSX.Element;
}> = ({ handleClose, patient, button }) => {
  const patientData = [
    {
      key: "email",
      value: patient.email,
    },
    {
      key: "PESEL",
      value: patient.pesel,
    },
    {
      key: "Data urodzenia",
      value: parsePeselToDateOfBirth(patient.pesel),
    },
  ];
  return (
    <Overlay>
      <Overlay.Container>
        <Overlay.Header
          title={`${patient.name} ${patient.surname}`}
          handleClose={handleClose}
        />
        <Overlay.Body>
          <ObjectCard data={patientData} keyStyle={false} />
        </Overlay.Body>
        <Overlay.Footer>{button && button}</Overlay.Footer>
      </Overlay.Container>
    </Overlay>
  );
};
