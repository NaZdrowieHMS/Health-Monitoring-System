import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { LinkButton, PrimaryButton } from "components/atoms";
import { CommentsCardForDoctor, ListCard, Navbar } from "components/molecules";
import ResultsFormOverlay from "components/molecules/overlays/ResultsFormOverlay";
import primaryColors from "properties/colors";
import {
  PatientData,
  PatientHealthComment,
  PatientReferral,
  PatientResult,
  CommentData,
  ListCardElement,
} from "properties/types";
import { paddingSize } from "properties/vars";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { UserContext } from "services/UserProvider";
import {
  getHealthComments,
  getPatient,
  getReferrals,
  getResults,
} from "services/patientData";
import { formatDate } from "services/utils";

const patientStyle = StyleSheet.create({
  container: {
    backgroundColor: primaryColors.babyBlue,
    paddingHorizontal: paddingSize.medium,
    paddingVertical: paddingSize.mediumBig,
    rowGap: paddingSize.mediumBig,
  },
  buttonContainer: {
    paddingHorizontal: paddingSize.mediumBig,
    rowGap: paddingSize.small,
  },
});

const PatientDetailsScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "PatientDetails">) => {
  const { patientId } = route.params;
  const [currentUserData] = useContext(UserContext);

  const [referralsData, setReferralsData] = useState<ListCardElement[]>([]);
  const [resultsData, setResultssData] = useState<ListCardElement[]>([]);
  const [patientData, setPatientData] = useState<PatientData>(null);
  const [currentDotorCommentsData, setCurrentDotorCommentsData] = useState<
    CommentData[]
  >([]);

  const [otherDotorsCommentsData, setOtherDotorsCommentsData] = useState<
    CommentData[]
  >([]);

  const [formResultsPreview, setFormResultsPreview] =
    React.useState<boolean>(false);

  useEffect(() => {
    setReferrals(patientId);
    setResults(patientId);
    setPatient(patientId);
    setHealthComments(patientId);
  }, []);

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

  const setReferrals = async (patientId: number) => {
    try {
      const data = await getReferrals(patientId);
      const formattedReferrals = data.map(formatReferralsData);
      setReferralsData(formattedReferrals);
    } catch (error) {
      console.error("Error fetching referrals:", error);
    }
  };

  const formatReferralsData = (referral: PatientReferral) => ({
    text: referral.testType,
    buttons: [<LinkButton title="Podgląd" color={primaryColors.lightBlue} />],
  });

  const setResults = async (patientId: number) => {
    try {
      const data = await getResults(patientId);
      const formattedResults = data.map(formatResultsData);
      setResultssData(formattedResults);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const formatResultsData = (result: PatientResult) => ({
    text: result.testType,
    buttons: [<LinkButton title="Przejdź" color={primaryColors.lightBlue} />],
  });

  const setPatient = async (patientId: number) => {
    try {
      const data = await getPatient(patientId);
      setPatientData(data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const setHealthComments = async (patientId: number) => {
    try {
      const data = await getHealthComments(patientId);
      const currentDotorComments = data.filter(
        (comment) => comment.doctor.id === currentUserData.id,
      );
      const otherDotorsComments = data.filter(
        (comment) => comment.doctor.id !== currentUserData.id,
      );
      setCurrentDotorCommentsData(currentDotorComments.map(formatCommentsData));
      setOtherDotorsCommentsData(otherDotorsComments.map(formatCommentsData));
    } catch (error) {
      console.error("Error fetching health comments:", error);
    }
  };

  const formatCommentsData = (comment: PatientHealthComment) => ({
    date: formatDate(comment.modifiedDate),
    text: comment.content,
    author: `${comment.doctor.name} ${comment.doctor.surname}`,
  });

  return (
    <View style={{ flex: 1 }}>
      <Navbar
        navbarDescriptionTitle={
          `${patientData?.name} ${patientData?.surname}` || ""
        }
      />
      <ScrollView contentContainerStyle={patientStyle.container}>
        <View style={patientStyle.buttonContainer}>
          <PrimaryButton
            handleOnClick={navigateToAiDiagnosis}
            title="Diagnozuj z AI"
          />
          <PrimaryButton title="Czat z pacjentem" />
          <PrimaryButton
            title="Załącz wynik badania"
            handleOnClick={() => setFormResultsPreview(true)}
          />
          <PrimaryButton title="Wystaw skierowanie" />
        </View>
        <CommentsCardForDoctor
          title="Zdrowie pacjenta"
          data={currentDotorCommentsData}
          dataOthers={otherDotorsCommentsData}
        />
        <ListCard
          title="Skierowania pacjenta"
          data={referralsData}
          handleSeeMore={navigateToAllReferals}
        />
        <ListCard
          title="Wyniki pacjenta"
          data={resultsData}
          handleSeeMore={navigateToAllResults}
        />
      </ScrollView>
      <ResultsFormOverlay
        isVisible={formResultsPreview}
        handleClose={() => setFormResultsPreview(false)}
      />
    </View>
  );
};

export default PatientDetailsScreen;
