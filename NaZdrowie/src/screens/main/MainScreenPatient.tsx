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
import { useOverlay, UserContext } from "services/context";
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
  const { currentUser } = useContext(UserContext);
  const { showOverlay, hideOverlay } = useOverlay();
  const [healthCommentsData, setHealthCommentsData] = useState<CommentData[]>(
    [],
  );

  const [referralsData, setReferralsData] = useState<ListCardElement[]>([]);
  const [resultsData, setResultssData] = useState<ListCardElement[]>([]);

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

  const openCommentsOverlay = (healthCommentsData: CommentData[]) => {
    showOverlay(() => (
      <CommentsOverlay
        handleClose={() => hideOverlay()}
        comments={healthCommentsData}
        title="Moje zdrowie"
      />
    ));
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
    text: referral.testType,
    buttons: !referral.completed
      ? [
          <LinkButton
            title="Podgląd"
            color={primaryColors.lightBlue}
            handleOnClick={() => openReferralOverviewOverlay(referral)}
          />,
          <LinkButton
            title="Załącz wynik"
            color={primaryColors.lightBlue}
            handleOnClick={() =>
              openResultsFormOverlay(referral.id, referral.testType)
            }
          />,
        ]
      : [
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
      console.error("Error fetching latest patients:", error);
    }
  };

  const formatResultsData = (result: PatientResult) => ({
    text: result.testType,
    buttons: [<LinkButton title="Podgląd" color={primaryColors.lightBlue} />],
  });

  const openResultsFormOverlay = (referralId?: number, testType?: string) => {
    showOverlay(() => (
      <ResultsFormOverlay
        handleClose={() => hideOverlay()}
        patientId={currentUser.id}
        referralId={referralId}
        referralTestType={testType}
      />
    ));
  };

  const openHealthFormFillOverlay = () => {
    showOverlay(() => (
      <HealthFormFillOverlay
        healthFormData={{ patientId: currentUser.id, content: healthFormItems }}
        handleClose={() => {
          hideOverlay();
        }}
      />
    ));
  };

  const openHealthFormResultOverlay = (data: HealthFormDisplayData) => {
    showOverlay(() => (
      <HealthFormResultOverlay
        healthFormData={data}
        handleClose={() => hideOverlay()}
      />
    ));
  };

  return (
    <ScrollView contentContainerStyle={mainStyle.container}>
      <View style={mainStyle.buttonContainer}>
        <PrimaryButton
          title="Wypełnij formularz zdrowia"
          handleOnClick={() => {
            openHealthFormFillOverlay();
          }}
        />
        <PrimaryButton
          title="Załącz wynik badania"
          handleOnClick={() => openResultsFormOverlay()}
        />
        <PrimaryButton title="Dodaj lekarza" />
        <PrimaryButton title="Czaty z lekarzami" />
      </View>
      <CommentsCard
        title="Moje zdrowie"
        data={healthCommentsData}
        handleSeeMore={() => openCommentsOverlay(healthCommentsData)}
      />
      <ListCard title="Moje skierowania" data={referralsData} />
      <ListCard title="Moje wyniki" data={resultsData} />
    </ScrollView>
  );
};

export default MainScreenPatient;
