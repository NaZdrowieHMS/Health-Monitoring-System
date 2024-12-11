import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { PrimaryButton } from "components/atoms";
import { CommentsCardForDoctor, ListCard, Navbar } from "components/molecules";
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
import { generalStyle, mainStyle } from "properties/styles";
import { useContext } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import Toast from "react-native-toast-message";

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
  const currentDotorCommentsQuery = prepareCurrentDotorComments();
  const otherDotorsCommentsQuery = prepareOtherDotorsComments();

  const { navigateToAllReferals, navigateToAllResults, navigateToAiDiagnosis } =
    useScreensNavigation();

  return (
    <>
      <QueryWrapper
        queries={[patientData]}
        renderSuccess={([patient]) => (
          <Navbar
            navbarDescriptionTitle={`${patient.name} ${patient.surname}`}
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
          <QueryWrapper
            temporaryTitle="Zdrowie pacjenta"
            queries={[currentDotorCommentsQuery, otherDotorsCommentsQuery]}
            renderSuccess={([currentDotorComments, otherDotorsComments]) => (
              <CommentsCardForDoctor
                title="Zdrowie pacjenta"
                data={currentDotorComments}
                dataOthers={otherDotorsComments}
                commentUpload={healthCommentUpload}
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
                handleSeeMore={navigateToAllReferals}
              />
            )}
          />
          <QueryWrapper
            queries={[latestResults, latestHealthForm]}
            temporaryTitle="Wyniki pacjenta"
            renderSuccess={([results, healthForm]) => (
              <ListCard
                title="Wyniki pacjenta"
                data={[...results, ...healthForm]}
                handleSeeMore={() => navigateToAllResults(patientId)}
              />
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
