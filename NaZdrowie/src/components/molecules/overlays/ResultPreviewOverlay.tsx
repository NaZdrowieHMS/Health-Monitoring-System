import { PatientResult } from "properties/types";
import React from "react";

import { Overlay } from "./Overlay";
import { CommentsCard, ImageCard } from "../cards";

export const ResultPreviewOverlay: React.FC<{
  handleClose: () => void;
  result: PatientResult;
}> = ({ handleClose, result }) => {
  return (
    <Overlay>
      <Overlay.Container>
        <Overlay.Header title={result.testType} handleClose={handleClose} />
        <Overlay.Body>
          <ImageCard
            title="Podgląd"
            imageData={result.content.data}
            imageType={result.content.type}
          />
          <CommentsCard title="Komentarze do badania" data={[]} />
        </Overlay.Body>
        <Overlay.Footer />
      </Overlay.Container>
    </Overlay>
  );
};
