import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { PrimaryButton } from "components/atoms";
import {
  CommentsCardForDoctor,
  ListCard,
  LoadingCard,
  Navbar,
} from "components/molecules";
import { usePatientData } from "components/organisms";
import { UserContext } from "components/organisms/context";
import { mainStyle } from "properties/styles";
import { DoctorComment } from "properties/types";
import React, { useContext } from "react";
import { View, ScrollView } from "react-native";
import { useFetchHealthComments, useFetchPatient } from "services/patientData";
import { formatDate } from "services/utils";

export const PatientDetailsScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "PatientDetails">) => {
  const { patientId } = route.params;
  const { currentUser } = useContext(UserContext);

  const patient = useFetchPatient(currentUser, null, patientId);
  const currentDotorComments = useFetchHealthComments(
    currentUser,
    (data) => {
      return data
        .filter((comment) => comment.doctor.id === currentUser.id)
        .map(formatCommentsData);
    },
    patientId,
  );
  const otherDotorsComments = useFetchHealthComments(
    currentUser,
    (data) => {
      return data
        .filter((comment) => comment.doctor.id !== currentUser.id)
        .map(formatCommentsData);
    },
    patientId,
  );
  const { referrals, results, openResultsFormOverlay } = usePatientData({
    id: patientId,
    isDoctor: false,
  });
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

  function formatCommentsData(comment: DoctorComment) {
    return {
      date: formatDate(comment.modifiedDate),
      text: comment.content,
      author: `${comment.doctor.name} ${comment.doctor.surname}`,
    };
  }

  return (
    <View style={{ flex: 1 }}>
      {patient.isSuccess ? (
        <Navbar
          navbarDescriptionTitle={`${patient.data.name} ${patient.data.surname}`}
        />
      ) : (
        <Navbar navbarDescriptionTitle="..." /> // maybe loading here or sth idk
      )}
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
          <PrimaryButton title="Wystaw skierowanie" />
        </View>

        {referrals.isSuccess &&
        currentDotorComments.isSuccess &&
        otherDotorsComments.isSuccess &&
        results.isSuccess ? (
          <>
            <CommentsCardForDoctor
              title="Zdrowie pacjenta"
              data={currentDotorComments.data}
              dataOthers={otherDotorsComments.data}
            />
            <ListCard
              title="Skierowania pacjenta"
              data={referrals.data}
              handleSeeMore={navigateToAllReferals}
            />
            <ListCard
              title="Wyniki pacjenta"
              data={results.data}
              handleSeeMore={navigateToAllResults}
            />
          </>
        ) : (
          <LoadingCard />
        )}
      </ScrollView>
    </View>
  );
};
