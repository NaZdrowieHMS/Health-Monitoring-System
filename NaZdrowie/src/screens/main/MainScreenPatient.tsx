import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { LinkButton, PrimaryButton } from "components/atoms";
import {
  CommentsCard,
  ListCard,
  HealthFormFillOverlay,
  CommentsOverlay,
  ReferralOverviewOverlay,
  ResultsFormOverlay,
  HealthFormResultOverlay,
} from "components/molecules";
import primaryColors from "properties/colors";
import { mainStyle } from "properties/styles";
import {
  PatientReferral,
  PatientResult,
  CommentData,
  ListCardElement,
  DoctorComment,
  healthFormItems,
  HealthFormDisplayData,
} from "properties/types";
import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { UserContext } from "services/UserProvider";
import {
  getHealthComments,
  getLatestHealthForm,
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
  const [referralOverviewData, setReferralOverviewData] =
    React.useState<PatientReferral>(null);
  const { currentUser } = useContext(UserContext);
  const [healthForm, setHealthForm] = React.useState<boolean>(false);
  const [formResultsPreview, setFormResultsPreview] = React.useState<{
    isVisible: boolean;
    referralId?: number;
    testType?: string;
  }>({ isVisible: false, referralId: null, testType: null });
  const [healthFormResultData, setHealthFormResultData] = React.useState<{
    isVisible: boolean;
    data: HealthFormDisplayData | null;
  }>({
    isVisible: false,
    data: null,
  });

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

  const formatCommentsData = (comment: DoctorComment) => ({
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
    buttons: !referral.completed
      ? [
          <LinkButton
            title="Podgląd"
            color={primaryColors.lightBlue}
            handleOnClick={() => setReferralOverviewData(referral)}
          />,
          <LinkButton
            title="Załącz wynik"
            color={primaryColors.lightBlue}
            handleOnClick={() =>
              setFormResultsPreview({
                isVisible: true,
                referralId: referral.id,
                testType: referral.testType,
              })
            }
          />,
        ]
      : [
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
      const formData = await getLatestHealthForm(patientId);
      const formattedResults = data.map(formatResultsData);
      if (formData != null) {
        formattedResults.push({
          text: `Formularz zdrowia ${formatDate(formData.createDate)}`,
          buttons: [
            <LinkButton
              title="Podgląd"
              color={primaryColors.lightBlue}
              handleOnClick={() =>
                setHealthFormResultData({ isVisible: true, data: formData })
              }
            />,
          ],
        });
      }
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
        <PrimaryButton
          title="Wypełnij formularz zdrowia"
          handleOnClick={() => {
            setHealthForm(true);
          }}
        />
        <PrimaryButton
          title="Załącz wynik badania"
          handleOnClick={() =>
            setFormResultsPreview({
              isVisible: true,
              referralId: null,
              testType: null,
            })
          }
        />
        <PrimaryButton title="Dodaj lekarza" />
        <PrimaryButton title="Czaty z lekarzami" />
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
        title="Moje zdrowie"
      />
      {referralOverviewData && (
        <ReferralOverviewOverlay
          isVisible={referralOverviewData !== null}
          handleClose={() => setReferralOverviewData(null)}
          referral={referralOverviewData}
        />
      )}
      <HealthFormFillOverlay
        healthFormData={{ patientId: currentUser.id, content: healthFormItems }}
        isVisible={healthForm}
        handleClose={() => {
          setHealthForm(false);
        }}
      />
      <ResultsFormOverlay
        isVisible={formResultsPreview.isVisible}
        handleClose={() =>
          setFormResultsPreview({
            isVisible: false,
            referralId: null,
            testType: null,
          })
        }
        patientId={currentUser.id}
        referralId={formResultsPreview.referralId}
        referralTestType={formResultsPreview.testType}
      />
      {healthFormResultData.data && (
        <HealthFormResultOverlay
          healthFormData={healthFormResultData.data}
          isVisible={healthFormResultData.isVisible}
          handleClose={() =>
            setHealthFormResultData({ isVisible: false, data: null })
          }
        />
      )}
    </ScrollView>
  );
};

export default MainScreenPatient;
