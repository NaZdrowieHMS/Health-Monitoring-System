import React from "react";
import QRCode from "react-native-qrcode-svg";

export const PersonalizedQrCode: React.FC<{
  url: string;
  size?: number;
}> = ({ url, size = 200 }) => {
  return <QRCode value={url} size={size} />;
};
