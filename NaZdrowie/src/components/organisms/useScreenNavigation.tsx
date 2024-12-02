import { useNavigation } from "@react-navigation/native";
import { Alert, Linking } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { RootStackParamList } from "App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const useScreensNavigation = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [, requestPermission] = useCameraPermissions();

  const navigateToAllPatientsScreen = () => {
    navigate("AllPatients");
  };

  const navigateToPatientScreen = (patientId: number) => {
    navigate("PatientDetails", {
      patientId,
    });
  };

  const navigateToNewPatientsScreen = () => {
    navigate("NewPatients");
  };

  const navigateToPatientRegisterScreen = () => {
    navigate("Register", { doctorScreen: false });
  };

  const navigateToDoctorRegisterScreen = () => {
    navigate("Register", { doctorScreen: true });
  };
  const navigateToLoginScreen = () => {
    navigate("Login");
  };

  const navigateToRegisterScreen = () => {
    navigate("Choice");
  };

  const navigateToMainScreen = () => {
    navigate("MainScreen");
  };

  const navigateToAllReferals = () => {
    // TODO
  };

  const navigateToAllResults = (patientId: number) => {
    navigate("AllResults", { patientId });
  };

  const navigateToAiDiagnosis = (patientId: number) => {
    navigate("AiDiagnosis", {
      patientId,
    });
  };

  const navigateToQrScanner = async () => {
    const { status } = await requestPermission();

    if (status === "granted") {
      navigate("QrScanner");
    } else {
      // This needs to be replaced with our custom alert or sth
      Alert.alert(
        "Permission required",
        "Permission to use the camera is required to scan QR codes. Please enable it in your settings.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ],
      );
    }
  };

  const navigateToResultPreviewScreen = (
    resultId: number,
    patientId: number,
    resultTitle: string,
  ) => {
    navigate("ResultPreview", {
      resultId,
      patientId,
      resultTitle,
    });
  };

  return {
    navigateToPatientScreen,
    navigateToNewPatientsScreen,
    navigateToPatientRegisterScreen,
    navigateToDoctorRegisterScreen,
    navigateToLoginScreen,
    navigateToRegisterScreen,
    navigateToMainScreen,
    navigateToAllReferals,
    navigateToAllResults,
    navigateToAiDiagnosis,
    navigateToQrScanner,
    navigateToResultPreviewScreen,
    navigateToAllPatientsScreen,
  };
};
