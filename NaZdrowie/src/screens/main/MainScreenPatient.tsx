import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { LinkButton, PrimaryButton } from "components/atoms";
import { CommentsCard, ListCard } from "components/molecules";
import CommentsOverlay from "components/molecules/overlays/CommentsOverlay";
import primaryColors from "properties/colors";
import { mainStyle } from "properties/styles/mainStyle";
import {
  PatientHealthComment,
  PatientReferral,
  PatientResult,
  CommentData,
  ListCardElement,
} from "properties/types";
import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { UserContext } from "services/UserProvider";
import {
  getHealthComments,
  getReferrals,
  getResults,
} from "services/patientData";
import { formatDate } from "services/utils";

const MainScreenPatient = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "MainScreen">) => {
  const [healthCommentsData, setHealthCommentsData] = useState<CommentData[]>(
    [],
  );

  const [referralsData, setReferralsData] = useState<ListCardElement[]>([]);
  const [resultsData, setResultssData] = useState<ListCardElement[]>([]);
  const [commentsOverlayPreview, setCommentsOverlayPreview] =
    React.useState<boolean>(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    setHealthComments(currentUser.id);
    setReferrals(currentUser.id);
    setResults(currentUser.id);
  }, []);

  const setHealthComments = async (patientId: number) => {
    try {
      const data = await getHealthComments(patientId);
      const formattedComments = data.map(formatCommentsData);
      setHealthCommentsData(formattedComments);
    } catch (error) {
      console.error("Error fetching latest patients:", error);
    }
  };

  const formatCommentsData = (comment: PatientHealthComment) => ({
    date: formatDate(comment.modifiedDate),
    text: comment.content,
    author: `${comment.doctor.name} ${comment.doctor.surname}`,
  });

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
    text: referral.testType,
    buttons: [
      <LinkButton title="Podgląd" color={primaryColors.lightBlue} />,
      <LinkButton title="Załącz wynik" color={primaryColors.lightBlue} />,
    ],
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
    text: result.testType,
    buttons: [<LinkButton title="Podgląd" color={primaryColors.lightBlue} />],
  });

  return (
    <ScrollView contentContainerStyle={mainStyle.container}>
      <View style={mainStyle.buttonContainer}>
        <PrimaryButton title="Czaty z lekarzami" />
        <PrimaryButton title="Wypełnij formularz zdrowia" />
        <PrimaryButton title="Załącz wynik badania" />
        <PrimaryButton title="Dodaj lekarza kodem QR" />
      </View>
      <CommentsCard
        title="Moje zdrowie"
        data={healthCommentsData}
        handleSeeMore={() => setCommentsOverlayPreview(true)}
      />
      <ListCard title="Moje skierowania" data={referralsData} />
      <ListCard title="Moje wyniki" data={resultsData} />
      <CommentsOverlay
        isVisible={commentsOverlayPreview}
        handleClose={() => setCommentsOverlayPreview(false)}
        comments={healthCommentsData}
        title="Komentarze do badania"
      />
    </ScrollView>
  );
};

export default MainScreenPatient;
