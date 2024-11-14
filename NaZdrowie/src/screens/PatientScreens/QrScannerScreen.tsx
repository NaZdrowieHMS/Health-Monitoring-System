import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { CameraOverlay } from "components/molecules";
import { CameraView } from "expo-camera";
import React, { useRef } from "react";
import {
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";

export const QrScannerScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "QrScanner">) => {
  const qrLock = useRef(false);
  const activateScannedUrl = ({ data }) => {
    if (data && !qrLock.current) {
      qrLock.current = true;
      setTimeout(async () => {
        await Linking.openURL(data);
        navigation.goBack();
      }, 500);
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={activateScannedUrl}
      />
      <CameraOverlay />
    </SafeAreaView>
  );
};
