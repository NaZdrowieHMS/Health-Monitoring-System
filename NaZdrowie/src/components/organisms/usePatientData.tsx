import { LinkButton } from "components/atoms";
import {
  CommentsOverlay,
  ReferralOverviewOverlay,
  ResultsFormOverlay,
  HealthFormFillOverlay,
  HealthFormResultOverlay,
} from "components/molecules";
import { useOverlay } from "components/organisms/context";
import {
  CommentData,
  DoctorComment,
  HealthFormDisplayData,
  healthFormItems,
  PatientReferral,
  PatientResult,
  UserData,
} from "properties/types";
import {
  useFetchHealthComments,
  useFetchReferrals,
  useFetchResults,
  useFetchLatestHealthForm,
} from "services/patientData";
import { formatDate } from "services/utils";

export const usePatientData = (currentUser: UserData) => {
  const { showOverlay, hideOverlay } = useOverlay();

  // handling health comment data
  const formatCommentsData = (comment: DoctorComment): CommentData => ({
    date: formatDate(comment.modifiedDate),
    text: comment.content,
    author: `${comment.doctor.name} ${comment.doctor.surname}`,
  });

  const healthComments = useFetchHealthComments(currentUser, (data) =>
    data.map(formatCommentsData),
  );

  const openCommentsOverlay = (healthCommentsData: CommentData[]) => {
    showOverlay(() => (
      <CommentsOverlay
        handleClose={() => hideOverlay()}
        comments={healthCommentsData}
        title="Moje zdrowie"
      />
    ));
  };

  // handling referral data
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

  const referrals = useFetchReferrals(currentUser, (data) =>
    data.map(formatReferralsData),
  );

  const openReferralOverviewOverlay = (referral: PatientReferral) => {
    showOverlay(() => (
      <ReferralOverviewOverlay
        handleClose={() => hideOverlay()}
        referral={referral}
      />
    ));
  };

  // handling results + health forms
  const formatResultsData = (result: PatientResult) => ({
    text: result.testType,
    buttons: [<LinkButton title="Podgląd" />],
  });

  const results = useFetchResults(currentUser, (data) =>
    data.map(formatResultsData),
  );
  const latestHealthForm = useFetchLatestHealthForm(currentUser, (data) => {
    return {
      text: `Formularz zdrowia ${formatDate(data.createDate)}`,
      buttons: [
        <LinkButton
          title="Podgląd"
          handleOnClick={() => openHealthFormResultOverlay(data)}
        />,
      ],
    };
  });

  if (results.isSuccess && latestHealthForm.data) {
    results.data?.push(latestHealthForm.data);
  }

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

  return {
    healthComments,
    referrals,
    results,
    openHealthFormFillOverlay,
    openResultsFormOverlay,
    openCommentsOverlay,
  };
};
