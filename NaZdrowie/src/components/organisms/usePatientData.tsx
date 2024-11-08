import { LinkButton } from "components/atoms";
import {
  CommentsOverlay,
  ReferralOverviewOverlay,
  ResultsFormOverlay,
  HealthFormFillOverlay,
  HealthFormResultOverlay,
} from "components/molecules";
import {
  CommentData,
  DoctorComment,
  HealthFormDisplayData,
  healthFormItems,
  ListCardElement,
  PatientReferral,
  PatientResult,
} from "properties/types";
import { useContext, useState } from "react";
import { useOverlay, UserContext } from "services/context";
import {
  getHealthComments,
  getReferrals,
  getResults,
  getLatestHealthForm,
} from "services/patientData";
import { formatDate } from "services/utils";

export const usePatientData = () => {
  const { showOverlay, hideOverlay } = useOverlay();
  const [healthCommentsData, setHealthCommentsData] = useState<CommentData[]>(
    [],
  );
  const [referralsData, setReferralsData] = useState<ListCardElement[]>([]);
  const [resultsData, setResultssData] = useState<ListCardElement[]>([]);

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
            handleOnClick={() => openReferralOverviewOverlay(referral)}
          />,
          <LinkButton
            title="Załącz wynik"
            handleOnClick={() =>
              openResultsFormOverlay(
                referral.patientId,
                referral.id,
                referral.testType,
              )
            }
          />,
        ]
      : [
          <LinkButton
            title="Podgląd"
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
    buttons: [<LinkButton title="Podgląd" />],
  });

  const openResultsFormOverlay = (
    patientId: number,
    referralId?: number,
    testType?: string,
  ) => {
    showOverlay(() => (
      <ResultsFormOverlay
        handleClose={() => hideOverlay()}
        patientId={patientId}
        referralId={referralId}
        referralTestType={testType}
      />
    ));
  };

  const openHealthFormFillOverlay = (patientId: number) => {
    showOverlay(() => (
      <HealthFormFillOverlay
        healthFormData={{ patientId, content: healthFormItems }}
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

  return {
    referralsData,
    resultsData,
    healthCommentsData,
    setHealthComments,
    setReferrals,
    setResults,
    openHealthFormFillOverlay,
    openResultsFormOverlay,
    openCommentsOverlay,
  };
};
