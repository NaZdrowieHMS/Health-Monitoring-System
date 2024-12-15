import { Comment, DeleteButton, EditButton } from "components/atoms";
import { cardStyle, generalStyle } from "properties/styles";
import { UserData } from "properties/types";
import React from "react";
import { View, Text } from "react-native";
import { formatDate } from "services/utils";

import { Overlay } from "./Overlay";
import { ObjectCard } from "components/molecules";
import { useFetchReferral } from "services/referralsData";
import { formatReferralInfo } from "../dataHooks/dataFormatHelpers";
import { QueryWrapper } from "../QueryWrapper";
import { paddingSize } from "properties/vars";

export const ReferralOverviewOverlay: React.FC<{
  handleClose: () => void;
  referralId: number;
  currentUser?: UserData;
}> = ({ handleClose, referralId, currentUser }) => {
  const referralQuery = useFetchReferral(currentUser, referralId);

  const editComment = (referral) => {
    console.log(referral.id);
  };

  return (
    <Overlay>
      <Overlay.Container>
        <Overlay.Header
          title={
            "Skierowanie nr " + referralQuery.isSuccess
              ? referralQuery.data?.referralNumber
              : "-----"
          }
          handleClose={handleClose}
        />
        <QueryWrapper
          queries={[referralQuery]}
          renderSuccess={([referral]) => (
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
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          columnGap: paddingSize.xSmall,
                        }}
                      >
                        <DeleteButton
                          handleOnClick={() => editComment(referral)}
                        />
                        <EditButton
                          handleOnClick={() => editComment(referral)}
                        />
                      </View>
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
          )}
        />
      </Overlay.Container>
    </Overlay>
  );
};
