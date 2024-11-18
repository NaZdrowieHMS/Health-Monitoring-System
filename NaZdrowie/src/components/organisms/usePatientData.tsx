import { LinkButton } from "components/atoms";
import { useCameraPermissions } from "expo-camera";
import { PatientReferral, PatientResult, UserData } from "properties/types";
import { Alert, Linking } from "react-native";
import { useFetchHealthComments } from "services/commentsData";
import { latestCount } from "services/config";
import {
  useFetchReferrals,
  useFetchResults,
  useFetchLatestHealthForm,
} from "services/patientData";
import { formatCommentsData, formatDate } from "services/utils";

import { useDesiredOverlay } from "./useDesiredOverlay";

export const usePatientData = (
  navigation,
  currentUser: UserData,
  patientId?: number,
) => {
  const {
    openReferralOverviewOverlay,
    openResultsFormOverlay,
    openHealthFormResultOverlay,
    openResultOverlay,
  } = useDesiredOverlay(currentUser);

  const [, requestPermission] = useCameraPermissions();

  const navigateToQrScannerScreen = async () => {
    const { status } = await requestPermission();

    if (status === "granted") {
      navigation.navigate("QrScanner");
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

  const formatReferralsView = (referral: PatientReferral) => ({
    text: referral.testType,
    buttons:
      !referral.completed && !currentUser.isDoctor
        ? [
            <LinkButton
              title="Podgląd"
              handleOnClick={() => openReferralOverviewOverlay(referral)}
            />,
            <LinkButton
              title="Załącz wynik"
              handleOnClick={() =>
                openResultsFormOverlay(
                  referral.patientId,
                  referral.id,
                  referral.testType,
                )
              }
            />,
          ]
        : [
            <LinkButton
              title="Podgląd"
              handleOnClick={() => openReferralOverviewOverlay(referral)}
            />,
          ],
  });

  const formatResultsView = (result: PatientResult) => ({
    text: result.testType,
    buttons: [
      <LinkButton
        title="Podgląd"
        handleOnClick={() => openResultOverlay(result)}
      />,
    ],
  });

  const healthComments = useFetchHealthComments(
    currentUser,
    (data) => data.map(formatCommentsData),
    patientId,
  );

  const latestHealthComments = useFetchHealthComments(
    currentUser,
    (data) => data.map(formatCommentsData),
    patientId,
    latestCount,
  );

  const referrals = useFetchReferrals(
    currentUser,
    (data) => data.map(formatReferralsView),
    patientId,
  );

  const latestReferrals = useFetchReferrals(
    currentUser,
    (data) =>
      data.filter((referral) => !referral.completed).map(formatReferralsView),
    patientId,
  );

  const results = useFetchResults(
    currentUser,
    (data) => data.map(formatResultsView),
    patientId,
  );

  const latestResults = useFetchResults(
    currentUser,
    (data) => data.map(formatResultsView),
    patientId,
    latestCount,
  );

  const latestHealthForm = useFetchLatestHealthForm(
    currentUser,
    (data) => {
      return {
        text: `Formularz zdrowia ${formatDate(data.createDate)}`,
        buttons: [
          <LinkButton
            title="Podgląd"
            handleOnClick={() => openHealthFormResultOverlay(data)}
          />,
        ],
      };
    },
    patientId,
  );

  if (latestResults.isSuccess && latestHealthForm.data) {
    latestResults.data?.push(latestHealthForm.data);
  }

  return {
    navigateToQrScannerScreen,
    healthComments,
    referrals,
    results,
    latestResults,
    latestReferrals,
    latestHealthComments,
  };
};
