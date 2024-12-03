import { LinkButton } from "components/atoms";
import { HealthFormDisplayData, UserData } from "properties/types";
import { useFetchHealthForms } from "services/healthFormsData";
import { formatShortDate } from "services/utils";
import { useDesiredOverlay } from "../useDesiredOverlay";
import { UserContext } from "../context";
import { useContext } from "react";

export const useHealthFormData = (
  currentUser: UserData,
  patientId?: number,
) => {
  const { setLatestHealthFormId } = useContext(UserContext);
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
      (data) => {
        setLatestHealthFormId(data[0].id);
        return data.map(formatHealthFormView);
      },
      { pageSize: 1 },
      patientId,
    );

  return {
    prepareLatestHealthForm,
  };
};
