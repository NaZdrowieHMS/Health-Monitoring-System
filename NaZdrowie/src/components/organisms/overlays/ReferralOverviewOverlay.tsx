import { Comment, EditButton } from "components/atoms";
import { cardStyle, generalStyle } from "properties/styles";
import { UserData } from "properties/types";
import React from "react";
import { View, Text } from "react-native";
import { formatDate } from "services/utils";

import { Overlay } from "./Overlay";
import { LoadingCard, ObjectCard } from "components/molecules";
import { useFetchReferral } from "services/referralsData";
import { formatReferralInfo } from "../dataHooks";

export const ReferralOverviewOverlay: React.FC<{
  handleClose: () => void;
  referralId: number;
  currentUser?: UserData;
}> = ({ handleClose, referralId, currentUser }) => {
  const { isSuccess, data: referral } = useFetchReferral(
    currentUser,
    referralId,
  );

  const editComment = () => {
    console.log(referral.id);
  };

  return (
    <Overlay>
      <Overlay.Container>
        <Overlay.Header
          title={
            "Skierowanie nr " + isSuccess ? referral?.referralNumber : "-----"
          }
          handleClose={handleClose}
        />
        {isSuccess ? (
          <>
            <Overlay.Body>
              <ObjectCard
                data={formatReferralInfo(referral)}
                keyStyle={generalStyle.keyText}
              />
            </Overlay.Body>
            <Overlay.Footer>
              <View style={cardStyle.rowSpread}>
                <Text style={generalStyle.titleText}>Komentarz</Text>
                {currentUser?.isDoctor &&
                  referral.doctor.id === currentUser.id && (
                    <EditButton handleOnClick={editComment} />
                  )}
              </View>
              {(referral.comment && (
                <Comment
                  item={{
                    text: referral.comment.content,
                    date: formatDate(referral.comment.modifiedDate),
                    author: "",
                  }}
                  index={0}
                  dontShowAuthor
                />
              )) ||
                (!referral.comment && <Text>Brak komentarza</Text>)}
            </Overlay.Footer>
          </>
        ) : (
          <LoadingCard></LoadingCard>
        )}
      </Overlay.Container>
    </Overlay>
  );
};
