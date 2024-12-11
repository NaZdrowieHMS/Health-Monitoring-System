import { UserData } from "properties/types";
import React from "react";
import { useFetchResultCommentsData } from "services/commentsData";
import { Overlay } from "./Overlay";
import { cardCommentsCount } from "services/config";
import { useFetchResultContent } from "services/resultsData";
import { ImageCard, CommentsCard } from "components/molecules";
import { formatCommentsData } from "../dataHooks/dataFormatHelpers";
import { QueryWrapper } from "../QueryWrapper";

export const ResultPreviewOverlay: React.FC<{
  currentUser: UserData;
  handleClose: () => void;
  resultId: number;
  resultTitle: string;
}> = ({ currentUser, handleClose, resultId, resultTitle }) => {
  const resultContent = useFetchResultContent(currentUser, resultId);
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
        <Overlay.Body>
          <QueryWrapper
            queries={[resultContent]}
            temporaryTitle="Podgląd"
            renderSuccess={([content]) => (
              <ImageCard
                title="Podgląd"
                imageData={content.data}
                imageType={content.type}
              />
            )}
          />
          <QueryWrapper
            queries={[resultComments]}
            temporaryTitle="Komentarze do badania"
            renderSuccess={([comments]) => (
              <CommentsCard title="Komentarze do badania" data={comments} />
            )}
          />
        </Overlay.Body>
        <Overlay.Footer />
      </Overlay.Container>
    </Overlay>
  );
};
