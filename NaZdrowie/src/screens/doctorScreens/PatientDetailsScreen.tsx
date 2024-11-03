import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { LinkButton, PrimaryButton } from "components/atoms";
import { CommentsCardForDoctor, ListCard, Navbar } from "components/molecules";
import {
  ReferralOverviewOverlay,
  ResultsFormOverlay,
} from "components/molecules/overlays";
import primaryColors from "properties/colors";
import {
  PatientData,
  PatientReferral,
  PatientResult,
  CommentData,
  ListCardElement,
  DoctorComment,
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

export const PatientDetailsScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "PatientDetails">) => {
  const { patientId } = route.params;
  const { currentUser } = useContext(UserContext);

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
  const [referralOverviewData, setReferralOverviewData] =
    React.useState<PatientReferral>(null);

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
    buttons: [
      <LinkButton
        title="Podgląd"
        color={primaryColors.lightBlue}
        handleOnClick={() => setReferralOverviewData(referral)}
      />,
    ],
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
        (comment) => comment.doctor.id === currentUser.id,
      );
      const otherDotorsComments = data.filter(
        (comment) => comment.doctor.id !== currentUser.id,
      );
      setCurrentDotorCommentsData(currentDotorComments.map(formatCommentsData));
      setOtherDotorsCommentsData(otherDotorsComments.map(formatCommentsData));
    } catch (error) {
      console.error("Error fetching health comments:", error);
    }
  };

  const formatCommentsData = (comment: DoctorComment) => ({
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
        patientId={patientId}
      />
      {referralOverviewData && (
        <ReferralOverviewOverlay
          isVisible={referralOverviewData !== null}
          handleClose={() => setReferralOverviewData(null)}
          referral={referralOverviewData}
          isDoctor
        />
      )}
    </View>
  );
};
