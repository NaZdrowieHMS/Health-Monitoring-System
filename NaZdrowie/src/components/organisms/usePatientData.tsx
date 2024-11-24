import { LinkButton } from "components/atoms";
import { useCameraPermissions } from "expo-camera";
import {
  HealthFormDisplayData,
  PatientReferral,
  StringNavigation,
  UserData,
} from "properties/types";
import { Alert, Linking } from "react-native";
import { useFetchHealthComments } from "services/commentsData";
import { latestCount } from "services/config";
import {
  useFetchReferrals,
  useFetchHealthForms,
  useFetchPatient,
} from "services/patientData";
import { formatCommentsData, formatDate } from "services/utils";

import { useDesiredOverlay } from "./useDesiredOverlay";
import { useNavigation } from "@react-navigation/native";

export const usePatientData = (currentUser: UserData, patientId?: number) => {
  const {
    openReferralOverviewOverlay,
    openResultsFormOverlay,
    openHealthFormResultOverlay,
  } = useDesiredOverlay(currentUser);
  const { navigate } = useNavigation<StringNavigation>();
  const [, requestPermission] = useCameraPermissions();

  const navigateToQrScannerScreen = async () => {
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

  const formatHealthFormView = (healthForm: HealthFormDisplayData) => {
    console.log("formatHealthFormView", healthForm.createDate);
    return {
      text: `Formularz zdrowia ${formatDate(healthForm.createDate)}`,
      buttons: [
        <LinkButton
          key="view-health-form"
          title="Podgląd"
          handleOnClick={() => openHealthFormResultOverlay(healthForm)}
        />,
      ],
    };
  };
  // const formatHealthFormView = (healthForm: HealthFormDisplayData) => ({
  //   text: `Formularz zdrowia ${formatDate(healthForm.createDate)}`,
  //   buttons: [
  //     <LinkButton
  //       key="view-health-form"
  //       title="Podgląd"
  //       handleOnClick={() => openHealthFormResultOverlay(healthForm)}
  //     />,
  //   ],
  // });

  const healthComments = useFetchHealthComments(
    currentUser,
    (data) => data.map(formatCommentsData),
    null,
    patientId,
  );

  const latestHealthComments = useFetchHealthComments(
    currentUser,
    (data) => data.map(formatCommentsData),
    { pageSize: latestCount },
    patientId,
  );

  const referrals = useFetchReferrals(
    currentUser,
    (data) => data.map(formatReferralsView),
    null,
    patientId,
  );

  const latestReferrals = useFetchReferrals(
    currentUser,
    (data) =>
      data.filter((referral) => !referral.completed).map(formatReferralsView),
    null,
    patientId,
  );

  const latestHealthForm = useFetchHealthForms(
    currentUser,
    (data) => data.map(formatHealthFormView),
    { pageSize: 1 },
    patientId,
  );

  const patientData = useFetchPatient(currentUser, null, patientId);

  return {
    navigateToQrScannerScreen,
    healthComments,
    referrals,
    latestHealthForm,
    latestReferrals,
    latestHealthComments,
    patientData,
  };
};
