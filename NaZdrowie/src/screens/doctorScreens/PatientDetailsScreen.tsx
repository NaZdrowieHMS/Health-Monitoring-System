import { LinkButton, PrimaryButton } from "components/atoms";
import { CommentsCardForDoctor, ListCard, Navbar } from "components/molecules";
import primaryColors from "properties/colors";
import { CommentData } from "properties/types/CommentsCardProps";
import { ListCardElement } from "properties/types/ListCardProps";
import {
  PatientData,
  PatientHealthComment,
  PatientReferral,
  PatientResult,
} from "properties/types/PatientDataProps";
import { paddingSize } from "properties/vars";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { CurrentUserData } from "services/config";
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

const PatientScreen = ({ route, navigation }) => {
  const { patientId } = route.params;

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

  const setReferrals = async (patientId: number) => {
    try {
      const data = await getReferrals(patientId);
      const formattedReferrals = data.map(formatReferralsData);
      setReferralsData(formattedReferrals);
    } catch (error) {
      console.error("Error fetching latest patients:", error);
    }
  };

  const formatReferralsData = (referral: PatientReferral) => ({
    text: referral.test_type,
    buttons: [<LinkButton title="Podgląd" color={primaryColors.lightBlue} />],
  });

  const setResults = async (patientId: number) => {
    try {
      const data = await getResults(patientId);
      const formattedResults = data.map(formatResultsData);
      setResultssData(formattedResults);
    } catch (error) {
      console.error("Error fetching latest patients:", error);
    }
  };

  const formatResultsData = (result: PatientResult) => ({
    text: result.test_type,
    buttons: [<LinkButton title="Przejdź" color={primaryColors.lightBlue} />],
  });

  const setPatient = async (patientId: number) => {
    try {
      const data = await getPatient(patientId);
      setPatientData(data);
    } catch (error) {
      console.error("Error fetching latest patients:", error);
    }
  };

  const setHealthComments = async (patientId: number) => {
    try {
      const data = await getHealthComments(patientId);
      const currentDotorComments = data.filter(
        (comment) => comment.doctor.id === CurrentUserData.id,
      );
      const otherDotorsComments = data.filter(
        (comment) => comment.doctor.id !== CurrentUserData.id,
      );
      setCurrentDotorCommentsData(currentDotorComments.map(formatCommentsData));
      setOtherDotorsCommentsData(otherDotorsComments.map(formatCommentsData));
    } catch (error) {
      console.error("Error fetching latest patients:", error);
    }
  };

  const formatCommentsData = (comment: PatientHealthComment) => ({
    date: formatDate(comment.modified_date),
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
          <PrimaryButton title="Diagnozuj z AI" />
          <PrimaryButton title="Czat z pacjentem" />
          <PrimaryButton title="Załącz wynik badania" />
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

export default PatientScreen;
