import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { PrimaryButton } from "components/atoms";
import {
  CommentsCardForDoctor,
  ListCard,
  LoadingCard,
  Navbar,
} from "components/molecules";
import {
  useDesiredOverlay,
  usePatientData,
  useDoctorData,
} from "components/organisms";
import { UserContext } from "components/organisms/context";
import { useResultsData } from "components/organisms/useResultsData";
import { generalStyle, mainStyle } from "properties/styles";
import { StringNavigation } from "properties/types";
import { useContext } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";

export const PatientDetailsScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, "PatientDetails">) => {
  const { patientId } = route.params;
  const { currentUser } = useContext(UserContext);
  const { openResultsFormOverlay, openReferralFormOverlay } =
    useDesiredOverlay(currentUser);
  const { navigate } = useNavigation<StringNavigation>();
  const { latestReferrals, patientData } = usePatientData(
    currentUser,
    patientId,
  );

  const { currentDotorComments, otherDotorsComments, healthCommentUpload } =
    useDoctorData(currentUser, patientId);

  const { latestResults } = useResultsData(currentUser, patientId);

  const navigateToAllReferals = () => {
    // TODO
  };

  const navigateToAllResults = () => {
    navigate("AllResults", { patientId });
  };

  const navigateToAiDiagnosis = () => {
    navigate("AiDiagnosis", {
      patientId,
    });
  };

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
              handleOnClick={navigateToAiDiagnosis}
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
          latestResults.isSuccess ? (
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
                data={latestResults.data}
                handleSeeMore={navigateToAllResults}
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
