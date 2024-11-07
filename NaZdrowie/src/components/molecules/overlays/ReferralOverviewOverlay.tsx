import { Comment } from "components/atoms";
import { EditButton } from "components/atoms/buttons/EditButton";
import { cardStyle, generalStyle } from "properties/styles";
import { ObjectCardElement, PatientReferral } from "properties/types";
import React from "react";
import { View, Text } from "react-native";
import { formatDate } from "services/utils";

import { Overlay } from "./Overlay";
import ObjectCard from "../cards/ObjectCard";

export const ReferralOverviewOverlay: React.FC<{
  handleClose: () => void;
  referral: PatientReferral;
  isDoctor?: boolean;
}> = ({ handleClose, referral, isDoctor }) => {
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
              {isDoctor && <EditButton handleOnClick={editComment} />}
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
