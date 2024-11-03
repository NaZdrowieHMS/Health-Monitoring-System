import { Comment } from "components/atoms";
import EditButton from "components/atoms/buttons/EditButton";
import { cardStyle } from "properties/styles";
import { ObjectCardElement, PatientReferral } from "properties/types";
import React from "react";
import { View, Text } from "react-native";
import { formatDate } from "services/utils";

import Overlay from "./Overlay";
import ObjectCard from "../cards/ObjectCard";

const ReferralOverviewOverlay: React.FC<{
  isVisible: boolean;
  handleClose: () => void;
  referral: PatientReferral;
  isDoctor?: boolean;
}> = ({ isVisible, handleClose, referral, isDoctor }) => {
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
    console.log(referral.referralId);
  };

  return (
    <Overlay isVisible={isVisible}>
      <Overlay.Container>
        <Overlay.Header
          title={"Skierowanie nr " + referral.referralNumber}
          handleClose={handleClose}
        />
        <Overlay.Body>
          <ObjectCard data={referralInfo} keyStyle={cardStyle.key} />
        </Overlay.Body>
        <Overlay.Footer>
          <View style={cardStyle.container}>
            <View style={cardStyle.rowSpread}>
              <Text style={cardStyle.title}>Komentarz</Text>
              {isDoctor && <EditButton handleOnClick={editComment} />}
            </View>
            {(referral.Comment && (
              <Comment
                item={{
                  text: referral.Comment.content,
                  date: formatDate(referral.Comment.modifiedDate),
                  author: "", // this data will not be used
                }}
                index={0}
                dontShowAuthor
              />
            )) ||
              (!referral.Comment && <Text>Brak komentarza</Text>)}
          </View>
        </Overlay.Footer>
      </Overlay.Container>
    </Overlay>
  );
};

export default ReferralOverviewOverlay;
