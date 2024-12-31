import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { InfoButton, PrimaryButton } from "components/atoms";
import { Navbar } from "components/molecules";
import { CommentsCardForDoctor, ListCard } from "components/molecules/cards";
import {
  QueryWrapper,
  useDesiredOverlay,
  useScreensNavigation,
} from "components/organisms";
import { UserContext } from "components/organisms/context";
import {
  usePatientData,
  useResultsData,
  useReferralsData,
  useCommentsData,
  useHealthFormData,
} from "components/organisms/dataHooks";
import primaryColors from "properties/colors";
import { generalStyle, mainStyle } from "properties/styles";
import React from "react";
import { useContext } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import Toast from "react-native-toast-message";

export const PatientDetailsScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, "PatientDetails">) => {
  const { patientId } = route.params;
  const { currentUser } = useContext(UserContext);
  const {
    openResultsFormOverlay,
    openReferralFormOverlay,
    openPatientInfoOverlay,
  } = useDesiredOverlay(currentUser);

  const { preparePatientData } = usePatientData(currentUser, patientId);
  const { prepareLatestResults } = useResultsData(currentUser, patientId);
  const { prepareLatestReferrals } = useReferralsData(currentUser, patientId);
  const { prepareLatestHealthForm } = useHealthFormData(currentUser, patientId);
  const {
    healthCommentUpload,
    prepareCurrentDoctorComments,
    prepareOtherDoctorsComments,
  } = useCommentsData(currentUser, patientId);

  const latestResults = prepareLatestResults();
  const latestHealthForm = prepareLatestHealthForm();
  const latestReferrals = prepareLatestReferrals();
  const patientData = preparePatientData();
  const currentDotorCommentsQuery = prepareCurrentDoctorComments();
  const otherDotorsCommentsQuery = prepareOtherDoctorsComments();

  const {
    navigateToAllReferrals,
    navigateToAllResults,
    navigateToAiDiagnosis,
  } = useScreensNavigation();

  return (
    <>
      <QueryWrapper
        queries={[patientData]}
        renderSuccess={([patient]) => (
          <Navbar
            navbarDescriptionTitle={`${patient.name} ${patient.surname}`}
            navbarDescriptionButton={
              <InfoButton
                color={primaryColors.white}
                handleOnClick={() => {
                  openPatientInfoOverlay(patient);
                }}
              />
            }
          />
        )}
        renderLoading={() => <Navbar navbarDescriptionTitle="..." />}
        renderError={(errors) => {
          Toast.show({
            type: "error",
            text1: "Błąd w pobieraniu informacji o pacjenice",
            text2: errors.join(", "),
          });
          return <Navbar navbarDescriptionTitle="..." />;
        }}
      />
      <SafeAreaView style={generalStyle.safeArea}>
        <ScrollView contentContainerStyle={mainStyle.container}>
          <View style={mainStyle.buttonContainer}>
            <PrimaryButton
              handleOnClick={() => navigateToAiDiagnosis(patientId)}
              title="Diagnozuj z AI"
              icon="robot-happy-outline"
            />
            <PrimaryButton
              title="Czat z pacjentem"
              icon="chatbubbles-outline"
            />
            <PrimaryButton
              title="Załącz wynik badania"
              handleOnClick={() => openResultsFormOverlay(patientId)}
              icon="document-attach-outline"
            />
            <PrimaryButton
              title="Wystaw skierowanie"
              handleOnClick={() => openReferralFormOverlay(patientId)}
              icon="document-text-outline"
            />
          </View>
          <QueryWrapper
            temporaryTitle="Zdrowie pacjenta"
            queries={[currentDotorCommentsQuery, otherDotorsCommentsQuery]}
            renderSuccess={([currentDotorComments, otherDotorsComments]) => (
              <CommentsCardForDoctor
                title="Zdrowie pacjenta"
                data={currentDotorComments}
                dataOthers={otherDotorsComments}
                commentUpload={healthCommentUpload}
                patientId={patientId}
              />
            )}
          />
          <QueryWrapper
            queries={[latestReferrals]}
            temporaryTitle="Aktywne skierowania pacjenta"
            renderSuccess={([referrals]) => (
              <ListCard
                title="Aktywne skierowania pacjenta"
                data={referrals}
                handleSeeMore={() => navigateToAllReferrals(patientId)}
              />
            )}
          />
          <QueryWrapper
            queries={[latestResults, latestHealthForm]}
            temporaryTitle="Wyniki pacjenta"
            renderSuccess={([results, healthForm]) => (
              <ListCard
                title="Wyniki pacjenta"
                data={[...healthForm, ...results]}
                handleSeeMore={() => navigateToAllResults(patientId)}
              />
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
