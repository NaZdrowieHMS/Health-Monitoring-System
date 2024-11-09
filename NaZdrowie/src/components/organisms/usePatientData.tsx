import { LinkButton } from "components/atoms";
import { PatientReferral, PatientResult, UserData } from "properties/types";
import {
  useFetchHealthComments,
  useFetchReferrals,
  useFetchResults,
  useFetchLatestHealthForm,
} from "services/patientData";
import { formatCommentsData, formatDate } from "services/utils";

import { useDesiredOverlay } from "./useDesiredOverlay";

export const usePatientData = (currentUser: UserData, patientId?: number) => {
  const {
    openReferralOverviewOverlay,
    openResultsFormOverlay,
    openHealthFormResultOverlay,
    openResultOverlay,
  } = useDesiredOverlay(currentUser);

  const formatReferralsView = (referral: PatientReferral) => ({
    text: referral.testType,
    buttons:
      !referral.completed && !currentUser.isDoctor
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

  const formatResultsView = (result: PatientResult) => ({
    text: result.testType,
    buttons: [
      <LinkButton
        title="Podgląd"
        handleOnClick={() => openResultOverlay(result)}
      />,
    ],
  });

  const healthComments = useFetchHealthComments(
    currentUser,
    (data) => data.map(formatCommentsData),
    patientId,
  );

  const referrals = useFetchReferrals(
    currentUser,
    (data) => data.map(formatReferralsView),
    patientId,
  );

  const results = useFetchResults(
    currentUser,
    (data) => data.map(formatResultsView),
    patientId,
  );
  const latestHealthForm = useFetchLatestHealthForm(
    currentUser,
    (data) => {
      return {
        text: `Formularz zdrowia ${formatDate(data.createDate)}`,
        buttons: [
          <LinkButton
            title="Podgląd"
            handleOnClick={() => openHealthFormResultOverlay(data)}
          />,
        ],
      };
    },
    patientId,
  );

  if (results.isSuccess && latestHealthForm.data) {
    results.data?.push(latestHealthForm.data);
  }

  return {
    healthComments,
    referrals,
    results,
  };
};
