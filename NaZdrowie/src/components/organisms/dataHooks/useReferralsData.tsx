import { LinkButton } from "components/atoms";
import { UserData, Referral } from "properties/types";
import { useFetchReferrals } from "services/referralsData";
import { patientDataPagination } from "services/utils";
import { useDesiredOverlay } from "../useDesiredOverlay";

export const useReferralsData = (currentUser: UserData, patientId?: number) => {
  const { openReferralOverviewOverlay, openResultsFormOverlay } =
    useDesiredOverlay(currentUser);

  const formatReferralsView = (referral: Referral) => ({
    text: referral.testType,
    buttons:
      !referral.completed && !currentUser.isDoctor
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
                  referral.testType
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

  const referrals = useFetchReferrals(
    currentUser,
    (data) => data.map(formatReferralsView),
    patientDataPagination.referrals,
    patientId
  );

  const latestReferrals = useFetchReferrals(
    currentUser,
    (data) =>
      data.filter((referral) => !referral.completed).map(formatReferralsView),
    patientDataPagination.latestReferrals,
    patientId
  );

  return {
    referrals,
    latestReferrals,
  };
};
