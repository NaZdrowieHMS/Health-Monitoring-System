import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { LinkButton, PrimaryButton } from "components/atoms";
import {
  CommentsCardForDoctor,
  HealthFormResultOverlay,
  ListCard,
  Navbar,
  ReferralOverviewOverlay,
  ResultsFormOverlay,
} from "components/molecules";
import primaryColors from "properties/colors";
import { mainStyle } from "properties/styles";
import {
  PatientData,
  PatientReferral,
  PatientResult,
  CommentData,
  ListCardElement,
  DoctorComment,
  HealthFormDisplayData,
} from "properties/types";
import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { UserContext, useOverlay } from "services/context";
import {
  getHealthComments,
  getLatestHealthForm,
  getPatient,
  getReferrals,
  getResults,
} from "services/patientData";
import { formatDate } from "services/utils";

export const PatientDetailsScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "PatientDetails">) => {
  const { patientId } = route.params;
  const { currentUser } = useContext(UserContext);
  const { showOverlay, hideOverlay } = useOverlay();

  const [referralsData, setReferralsData] = useState<ListCardElement[]>([]);
  const [resultsData, setResultssData] = useState<ListCardElement[]>([]);
  const [patientData, setPatientData] = useState<PatientData>(null);
  const [currentDotorCommentsData, setCurrentDotorCommentsData] = useState<
    CommentData[]
  >([]);

  const [otherDotorsCommentsData, setOtherDotorsCommentsData] = useState<
    CommentData[]
  >([]);

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
        handleOnClick={() => openReferralOverviewOverlay(referral)}
      />,
    ],
  });

  const openReferralOverviewOverlay = (referral: PatientReferral) => {
    showOverlay(() => (
      <ReferralOverviewOverlay
        handleClose={() => hideOverlay()}
        referral={referral}
      />
    ));
  };

  const setResults = async (patientId: number) => {
    try {
      const data = await getResults(patientId);
      const formData = await getLatestHealthForm(patientId);
      const formattedResults = data.map(formatResultsData);
      if (formData != null) {
        formattedResults.push({
          text: `Formularz zdrowia ${formatDate(formData.createDate)}`,
          buttons: [
            <LinkButton
              title="Podgląd"
              color={primaryColors.lightBlue}
              handleOnClick={() => openHealthFormResultOverlay(formData)}
            />,
          ],
        });
      }
      setResultssData(formattedResults);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const openHealthFormResultOverlay = (data: HealthFormDisplayData) => {
    showOverlay(() => (
      <HealthFormResultOverlay
        healthFormData={data}
        handleClose={() => hideOverlay()}
      />
    ));
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

  const openResultsFormOverlay = () => {
    showOverlay(() => (
      <ResultsFormOverlay
        handleClose={() => hideOverlay()}
        patientId={currentUser.id}
      />
    ));
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
      <ScrollView contentContainerStyle={mainStyle.container}>
        <View style={mainStyle.buttonContainer}>
          <PrimaryButton
            handleOnClick={navigateToAiDiagnosis}
            title="Diagnozuj z AI"
          />
          <PrimaryButton title="Czat z pacjentem" />
          <PrimaryButton
            title="Załącz wynik badania"
            handleOnClick={() => openResultsFormOverlay()}
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
    </View>
  );
};
