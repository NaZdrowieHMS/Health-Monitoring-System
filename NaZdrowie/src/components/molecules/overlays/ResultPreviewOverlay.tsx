import { UserContext } from "components/organisms/context";
import { PatientResult } from "properties/types";
import React, { useContext } from "react";
import { useFetchResultCommentsData } from "services/commentsData";
import { formatCommentsData } from "services/utils";

import { Overlay } from "./Overlay";
import { CommentsCard, ImageCard, LoadingCard } from "../cards";

export const ResultPreviewOverlay: React.FC<{
  handleClose: () => void;
  result: PatientResult;
}> = ({ handleClose, result }) => {
  const { currentUser } = useContext(UserContext);
  const resultComments = useFetchResultCommentsData(
    currentUser,
    result.id,
    (data) => data.map(formatCommentsData),
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
          <CommentsCard title="Komentarze do badania" data={[]} />
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
