import { PatientResult, UserData } from "properties/types";
import React from "react";
import { useFetchResultCommentsData } from "services/commentsData";
import { formatCommentsData } from "services/utils";

import { Overlay } from "./Overlay";
import { CommentsCard, ImageCard, LoadingCard } from "../cards";
import { cardCommentsCount } from "services/config";

export const ResultPreviewOverlay: React.FC<{
  currentUser: UserData;
  handleClose: () => void;
  result: PatientResult;
}> = ({ currentUser, handleClose, result }) => {
  const resultComments = useFetchResultCommentsData(
    currentUser,
    result.id,
    (data) => data.map(formatCommentsData),
    cardCommentsCount,
  );

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
          {resultComments.isSuccess ? (
            <CommentsCard
              title="Komentarze do badania"
              data={resultComments.data}
            />
          ) : (
            <LoadingCard />
          )}
        </Overlay.Body>
        <Overlay.Footer />
      </Overlay.Container>
    </Overlay>
  );
};
