import { useQueryClient } from "@tanstack/react-query";
import {
  CommentsOverlay,
  HealthFormFillOverlay,
  HealthFormResultOverlay,
  ReferralOverviewOverlay,
  QrDisplayOverlay,
  ResultPreviewOverlay,
  ReferralFormOverlay,
  ResultsFormOverlay,
} from "components/molecules";
import { PatientDetailsOverlay } from "components/molecules/overlays/PatientDetialsOverlay";
import {
  CommentData,
  HealthFormDisplayData,
  healthFormItems,
  PatientData,
  PatientReferral,
  UserData,
} from "properties/types";

import { useOverlay } from "./context";

export const useDesiredOverlay = (currentUser: UserData) => {
  const { showOverlay, hideOverlay } = useOverlay();
  const queryClient = useQueryClient();

  const openCommentsOverlay = (healthCommentsData: CommentData[]) => {
    showOverlay(() => (
      <CommentsOverlay
        handleClose={hideOverlay}
        comments={healthCommentsData}
        title="Moje zdrowie"
      />
    ));
  };

  const openReferralOverviewOverlay = (referral: PatientReferral) => {
    showOverlay(() => (
      <ReferralOverviewOverlay
        handleClose={hideOverlay}
        referral={referral}
        currentUser={currentUser}
      />
    ));
  };

  const openResultsFormOverlay = (
    patientId: number,
    referralId?: number,
    testType?: string,
  ) => {
    showOverlay(() => (
      <ResultsFormOverlay
        currentUser={currentUser}
        handleClose={hideOverlay}
        patientId={patientId}
        referralId={referralId}
        referralTestType={testType}
      />
    ));
  };

  const openHealthFormFillOverlay = (patientId: number) => {
    showOverlay(() => (
      <HealthFormFillOverlay
        currentUser={currentUser}
        healthFormData={{ patientId, content: healthFormItems }}
        handleClose={hideOverlay}
      />
    ));
  };

  const openHealthFormResultOverlay = (data: HealthFormDisplayData) => {
    showOverlay(() => (
      <HealthFormResultOverlay
        healthFormData={data}
        handleClose={hideOverlay}
      />
    ));
  };

  const openResultOverlay = (resultId: number, resultTitle) => {
    showOverlay(() => (
      <ResultPreviewOverlay
        resultId={resultId}
        resultTitle={resultTitle}
        handleClose={hideOverlay}
        currentUser={currentUser}
      />
    ));
  };

  const openReferralFormOverlay = (patientId: number) => {
    showOverlay(() => (
      <ReferralFormOverlay
        handleClose={hideOverlay}
        currentUser={currentUser}
        patientId={patientId}
      />
    ));
  };

  const hideAndRefreshData = () => {
    hideOverlay();
    queryClient.invalidateQueries({
      queryKey: [currentUser, `doctors/${currentUser.id}/patients`],
    });
  };

  const openQrDisplayOverlay = () => {
    showOverlay(() => (
      <QrDisplayOverlay
        handleClose={hideAndRefreshData}
        doctorId={currentUser.id}
      />
    ));
  };

  function openPatientInfoOverlay(
    patient: PatientData,
    button?: React.JSX.Element,
  ) {
    showOverlay(() => (
      <PatientDetailsOverlay
        handleClose={hideOverlay}
        patient={patient}
        button={button}
      />
    ));
  }

  return {
    openCommentsOverlay,
    openReferralOverviewOverlay,
    openResultsFormOverlay,
    openHealthFormFillOverlay,
    openHealthFormResultOverlay,
    openResultOverlay,
    openReferralFormOverlay,
    openQrDisplayOverlay,
    openPatientInfoOverlay,
  };
};
