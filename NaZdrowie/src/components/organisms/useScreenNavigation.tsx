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

  const navigateToAllReferrals = (patientId: number) => {
    navigate("AllReferrals", { patientId });
  };

  const navigateToAllResults = (patientId: number) => {
    navigate("AllResults", { patientId });
  };

  const navigateToAllHealthComments = (patientId: number) => {
    navigate("AllHealthComments", { patientId });
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
      // Here action is required - so Alert stays
      Alert.alert(
        "Brak upoważnień do kamery",
        "Dostęp do kamery znacząco polepsza korzystanie z funkcjonalności skanowania kodów QR.",
        [
          { text: "Anuluj", style: "cancel" },
          { text: "Otwórz ustawienia", onPress: () => Linking.openSettings() },
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
    navigateToAllReferrals,
    navigateToAllResults,
    navigateToAiDiagnosis,
    navigateToQrScanner,
    navigateToResultPreviewScreen,
    navigateToAllPatientsScreen,
    navigateToAllHealthComments,
  };
};
