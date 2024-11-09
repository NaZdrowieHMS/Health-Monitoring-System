import {
  CommentsOverlay,
  HealthFormFillOverlay,
  HealthFormResultOverlay,
  ReferralOverviewOverlay,
  ResultsFormOverlay,
  ResultPreviewOverlay,
} from "components/molecules";
import {
  CommentData,
  HealthFormDisplayData,
  healthFormItems,
  PatientReferral,
  PatientResult,
  UserData,
} from "properties/types";

import { useOverlay } from "./context";

export const useDesiredOverlay = (currentUser: UserData) => {
  const { showOverlay, hideOverlay } = useOverlay();

  const openCommentsOverlay = (healthCommentsData: CommentData[]) => {
    showOverlay(() => (
      <CommentsOverlay
        handleClose={() => hideOverlay()}
        comments={healthCommentsData}
        title="Moje zdrowie"
      />
    ));
  };

  const openReferralOverviewOverlay = (referral: PatientReferral) => {
    showOverlay(() => (
      <ReferralOverviewOverlay
        handleClose={() => hideOverlay()}
        referral={referral}
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

  const openResultOverlay = (data: PatientResult) => {
    showOverlay(() => (
      <ResultPreviewOverlay result={data} handleClose={() => hideOverlay()} />
    ));
  };

  return {
    openCommentsOverlay,
    openReferralOverviewOverlay,
    openResultsFormOverlay,
    openHealthFormFillOverlay,
    openHealthFormResultOverlay,
    openResultOverlay,
  };
};
