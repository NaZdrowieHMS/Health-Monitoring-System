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
import { generalStyle, mainStyle } from "properties/styles";
import React, { useContext } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";

export const PatientDetailsScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "PatientDetails">) => {
  const { patientId } = route.params;
  const { currentUser } = useContext(UserContext);
  const { openResultsFormOverlay, openReferralFormOverlay } =
    useDesiredOverlay(currentUser);

  const { latestReferrals } = usePatientData(
    navigation,
    currentUser,
    patientId,
  );
  const { 
    currentDotorComments, 
    otherDotorsComments, 
    latestPatientResults, 
    healthCommentUpload, 
    currentPatient 
  } = useDoctorData(navigation, currentUser, patientId);

  const navigateToAllReferals = () => {
    // TODO
  };

  const navigateToAllResults = () => {
    // TODO
  };

  const navigateToAiDiagnosis = () => {
    navigation.navigate("AiDiagnosis", {
      patientId,
    });
  };

  return (
    <>
      {currentPatient.isSuccess ? (
        <Navbar
          navigation={(path) => navigation.navigate(path)}
          navbarDescriptionTitle={`${currentPatient.data.name} ${currentPatient.data.surname}`}
        />
      ) : (
        <Navbar
          navigation={(path) => navigation.navigate(path)}
          navbarDescriptionTitle="..."
        /> // maybe loading here or sth idk
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
          latestPatientResults.isSuccess ? (
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
                data={latestPatientResults.data}
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
