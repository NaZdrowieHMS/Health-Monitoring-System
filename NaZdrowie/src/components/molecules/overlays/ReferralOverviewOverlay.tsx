import { Comment } from "components/atoms";
import { IconButton } from "components/atoms/buttons";
import { cardStyle, generalStyle } from "properties/styles";
import { ObjectCardElement, PatientReferral, UserData } from "properties/types";
import React from "react";
import { View, Text } from "react-native";
import { formatDate } from "services/utils";

import { Overlay } from "./Overlay";
import { ObjectCard } from "../cards";

export const ReferralOverviewOverlay: React.FC<{
  handleClose: () => void;
  referral: PatientReferral;
  currentUser?: UserData;
}> = ({ handleClose, referral, currentUser }) => {
  const referralInfo: ObjectCardElement[] = [
    {
      key: "Data wystawienia",
      value: formatDate(referral.createdDate),
    },
    {
      key: "Wystawiający",
      value: "dr " + referral.doctor.name + " " + referral.doctor.surname,
    },
    {
      key: "Rodzaj badania:",
      value: referral.testType,
    },
  ];

  const editComment = () => {
    console.log(referral.id);
  };

  return (
    <Overlay>
      <Overlay.Container>
        <Overlay.Header
          title={"Skierowanie nr " + referral.referralNumber}
          handleClose={handleClose}
        />
        <Overlay.Body>
          <ObjectCard data={referralInfo} keyStyle={generalStyle.keyText} />
        </Overlay.Body>
        <Overlay.Footer>
          <View style={cardStyle.container}>
            <View style={cardStyle.rowSpread}>
              <Text style={generalStyle.titleText}>Komentarz</Text>
              {currentUser?.isDoctor &&
                referral.doctor.id === currentUser.id && (
                  <IconButton handleOnClick={editComment} type="edit" />
                )}
            </View>
            {(referral.comment && (
              <Comment
                item={{
                  text: referral.comment.content,
                  date: formatDate(referral.comment.modifiedDate),
                  author: "", // this data will not be used
                }}
                index={0}
                dontShowAuthor
              />
            )) ||
              (!referral.comment && <Text>Brak komentarza</Text>)}
          </View>
        </Overlay.Footer>
      </Overlay.Container>
    </Overlay>
  );
};
