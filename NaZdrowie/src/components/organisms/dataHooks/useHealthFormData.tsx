import { LinkButton } from "components/atoms";
import { HealthFormDisplayData, UserData } from "properties/types";
import { useFetchHealthForms } from "services/healthFormsData";
import { formatShortDate, patientDataPagination } from "services/utils";
import { useDesiredOverlay } from "../useDesiredOverlay";

export const useHealthFormData = (
  currentUser: UserData,
  patientId?: number,
) => {
  const { openHealthFormResultOverlay } = useDesiredOverlay(currentUser);
  const formatHealthFormView = (healthForm: HealthFormDisplayData) => ({
    text: `Formularz zdrowia ${formatShortDate(healthForm.createDate)}`,
    buttons: [
      <LinkButton
        key="view-health-form"
        title="Podgląd"
        handleOnClick={() => openHealthFormResultOverlay(healthForm)}
      />,
    ],
  });

  const prepareLatestHealthForm = () =>
    useFetchHealthForms(
      currentUser,
      (data) => data.map(formatHealthFormView),
      patientDataPagination.latestHealthForm,
      patientId,
    );

  return {
    prepareLatestHealthForm,
  };
};
