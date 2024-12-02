import { UserData } from "properties/types";
import React from "react";
import { useFetchResultCommentsData } from "services/commentsData";
import { Overlay } from "./Overlay";
import { cardCommentsCount } from "services/config";
import { useFetchResult } from "services/resultsData";
import { LoadingCard, ImageCard, CommentsCard } from "components/molecules";
import { formatCommentsData } from "../dataHooks/dataFormatHelpers";

export const ResultPreviewOverlay: React.FC<{
  currentUser: UserData;
  handleClose: () => void;
  resultId: number;
  resultTitle: string;
}> = ({ currentUser, handleClose, resultId, resultTitle }) => {
  const {
    isSuccess,
    isLoading,
    data: result,
  } = useFetchResult(currentUser, resultId);

  const resultComments = useFetchResultCommentsData(
    currentUser,
    resultId,
    (data) => data.map(formatCommentsData),
    { pageSize: cardCommentsCount },
  );

  return (
    <Overlay>
      <Overlay.Container>
        <Overlay.Header title={resultTitle} handleClose={handleClose} />
        {isLoading && <LoadingCard />}
        {isSuccess && result && (
          <>
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
          </>
        )}
      </Overlay.Container>
    </Overlay>
  );
};
