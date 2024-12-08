import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { PrimaryButton } from "components/atoms";
import {
  CommentsCardForDoctor,
  ListCard,
  LoadingCard,
  Navbar,
} from "components/molecules";
import { useDesiredOverlay, useScreensNavigation } from "components/organisms";
import { UserContext } from "components/organisms/context";
import {
  usePatientData,
  useResultsData,
  useReferralsData,
  useCommentsData,
  useHealthFormData,
} from "components/organisms/dataHooks";
import { generalStyle, mainStyle } from "properties/styles";
import { useContext } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";

export const PatientDetailsScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, "PatientDetails">) => {
  const { patientId } = route.params;
  const { currentUser } = useContext(UserContext);
  const { openResultsFormOverlay, openReferralFormOverlay } =
    useDesiredOverlay(currentUser);

  const { preparePatientData } = usePatientData(currentUser, patientId);
  const { prepareLatestResults } = useResultsData(currentUser, patientId);
  const { prepareLatestReferrals } = useReferralsData(currentUser, patientId);
  const { prepareLatestHealthForm } = useHealthFormData(currentUser, patientId);
  const {
    healthCommentUpload,
    prepareCurrentDotorComments,
    prepareOtherDotorsComments,
  } = useCommentsData(currentUser, patientId);

  const latestResults = prepareLatestResults();
  const latestHealthForm = prepareLatestHealthForm();
  const latestReferrals = prepareLatestReferrals();
  const patientData = preparePatientData();
  const currentDotorComments = prepareCurrentDotorComments();
  const otherDotorsComments = prepareOtherDotorsComments();

  const { navigateToAllReferals, navigateToAllResults, navigateToAiDiagnosis } =
    useScreensNavigation();

  return (
    <>
      {patientData.isSuccess ? (
        <Navbar
          navbarDescriptionTitle={`${patientData.data.name} ${patientData.data.surname}`}
        />
      ) : (
        <Navbar navbarDescriptionTitle="..." /> // maybe loading here or sth idk
      )}
      <SafeAreaView style={generalStyle.safeArea}>
        <ScrollView contentContainerStyle={mainStyle.container}>
          <View style={mainStyle.buttonContainer}>
            <PrimaryButton
              handleOnClick={() => navigateToAiDiagnosis(patientId)}
              title="Diagnozuj z AI"
            />
            <PrimaryButton title="Czat z pacjentem" />
            <PrimaryButton
              title="Załącz wynik badania"
              handleOnClick={() => openResultsFormOverlay(patientId)}
            />
            <PrimaryButton
              title="Wystaw skierowanie"
              handleOnClick={() => openReferralFormOverlay(patientId)}
            />
          </View>

          {latestReferrals.isSuccess &&
          currentDotorComments.isSuccess &&
          otherDotorsComments.isSuccess &&
          latestResults.isSuccess &&
          latestHealthForm.isSuccess ? (
            <>
              <CommentsCardForDoctor
                title="Zdrowie pacjenta"
                data={currentDotorComments.data}
                dataOthers={otherDotorsComments.data}
                commentUpload={healthCommentUpload}
              />
              <ListCard
                title="Aktywne skierowania pacjenta"
                data={latestReferrals.data}
                handleSeeMore={navigateToAllReferals}
              />
              <ListCard
                title="Wyniki pacjenta"
                data={[...latestResults.data, ...latestHealthForm.data]}
                handleSeeMore={() => navigateToAllResults(patientId)}
              />
            </>
          ) : (
            <LoadingCard />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
