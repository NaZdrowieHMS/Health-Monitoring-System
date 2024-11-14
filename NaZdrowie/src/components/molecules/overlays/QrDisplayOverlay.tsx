import { PersonalizedQrCode } from "components/atoms";
import { overlayStyle } from "properties/styles";
import React from "react";
import { Dimensions, View } from "react-native";

import { Overlay } from "./Overlay";

export const QrDisplayOverlay: React.FC<{
  doctorId: number;
  handleClose: () => void;
}> = ({ doctorId, handleClose }) => {
  const screenWidth = Dimensions.get("window").width;
  const qrCodeSize = screenWidth * 0.65;
  return (
    <Overlay>
      <Overlay.Container>
        <Overlay.Header
          title="Dodaj pacjenta kodem QR"
          handleClose={handleClose}
        />
        <Overlay.Body>
          <View style={overlayStyle.centeredElement}>
            <PersonalizedQrCode
              url={`{"doctorId":${doctorId}}`}
              size={qrCodeSize}
            />
          </View>
        </Overlay.Body>
      </Overlay.Container>
    </Overlay>
  );
};
