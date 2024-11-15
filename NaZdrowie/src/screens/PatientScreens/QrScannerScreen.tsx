import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { CameraOverlay } from "components/molecules";
import { UserContext } from "components/organisms/context";
import { CameraView } from "expo-camera";
import React, { useContext, useRef } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useBindPatientToDoctor } from "services/patientData";

export const QrScannerScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "QrScanner">) => {
  const qrLock = useRef(false);
  const { currentUser } = useContext(UserContext);
  const bind = useBindPatientToDoctor(currentUser);

  const activateScannedUrl = ({ data }) => {
    if (data && !qrLock.current) {
      qrLock.current = true;
      try {
        data = JSON.parse(data);
        if (typeof data.doctorId === "number") {
          bind.mutate(data.doctorId);
          // await Linking.openURL(data); // should be used when deep linking is introduced
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert(
          "What are you scanning?",
          "Error message: " + error.message,
          [
            {
              text: "Try again",
              onPress: () => (qrLock.current = false),
            },
            { text: "Cancel", onPress: () => navigation.goBack() },
          ],
        );
      }
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
