import { LinkButton } from "components/atoms";
import { UserData, Referral } from "properties/types";
import { useFetchReferrals } from "services/referralsData";
import { patientDataPagination } from "services/utils";
import { useDesiredOverlay } from "../useDesiredOverlay";
import { ReferralEntry } from "components/molecules";

export const useReferralsData = (currentUser: UserData, patientId?: number) => {
  const { openReferralOverviewOverlay, openResultsFormOverlay } =
    useDesiredOverlay(currentUser);

  const formatReferralsView = (referral: Referral) => ({
    text: referral.testType,
    buttons: !referral.completed
      ? [
          <LinkButton
            title="Podgląd"
            handleOnClick={() => openReferralOverviewOverlay(referral.id)}
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
            handleOnClick={() => openReferralOverviewOverlay(referral.id)}
          />,
        ],
  });

  const formatReferralButton = (referral: Referral) => {
    return (
      <ReferralEntry
        patientId={referral.patientId}
        id={referral.id}
        completed={referral.completed}
        title={referral.testType}
        createdDate={referral.createdDate}
        key={referral.id}
      />
    );
  };

  const prepareReferrals = () =>
    useFetchReferrals(
      currentUser,
      (data) => data.map(formatReferralsView),
      patientDataPagination.referrals,
      patientId,
    );

  const prepareLatestReferrals = () =>
    useFetchReferrals(
      currentUser,
      (data) =>
        data.filter((referral) => !referral.completed).map(formatReferralsView),
      patientDataPagination.latestReferrals,
      patientId,
    );

  const prepareAllReferrals = () =>
    useFetchReferrals(
      currentUser,
      (data) => data.map(formatReferralButton),
      patientDataPagination.referrals,
      patientId,
    );

  return {
    prepareReferrals,
    prepareAllReferrals,
    prepareLatestReferrals,
  };
};
