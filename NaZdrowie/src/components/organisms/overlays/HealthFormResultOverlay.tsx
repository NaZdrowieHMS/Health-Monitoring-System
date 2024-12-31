import { generalStyle } from "properties/styles";
import { HealthFormDisplayData } from "properties/types";
import React from "react";
import { formatDate } from "services/utils";

import { Overlay } from "./Overlay";
import { ObjectCard } from "components/molecules/cards/ObjectCard";

export const HealthFormResultOverlay: React.FC<{
  handleClose: () => void;
  healthFormData: HealthFormDisplayData;
}> = ({ handleClose, healthFormData }) => {
  return (
    <Overlay>
      <Overlay.Container>
        <Overlay.Header
          title={"Formularz zdrowia " + formatDate(healthFormData.createDate)}
          handleClose={handleClose}
        />
        <Overlay.Body>
          <ObjectCard
            data={healthFormData.content}
            keyStyle={generalStyle.keyText}
          />
        </Overlay.Body>
        <Overlay.Footer />
      </Overlay.Container>
    </Overlay>
  );
};
