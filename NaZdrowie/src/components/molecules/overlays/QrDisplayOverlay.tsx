import { PersonalizedQRCode } from "components/atoms";
import React from "react";

import { Overlay } from "./Overlay";

export const QrDisplayOverlay: React.FC<{
  doctorId: number;
  handleClose: () => void;
}> = ({ doctorId, handleClose }) => {
  return (
    <Overlay>
      <Overlay.Container>
        <Overlay.Header
          title="Dodaj pacjenta kodem QR"
          handleClose={handleClose}
        />
        <Overlay.Body>
          <PersonalizedQRCode url={`{"doctorId":${doctorId}}`} />
        </Overlay.Body>
      </Overlay.Container>
    </Overlay>
  );
};
