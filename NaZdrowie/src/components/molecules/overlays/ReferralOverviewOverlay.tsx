import { Comment } from "components/atoms";
import { cardStyle } from "properties/styles";
import {
  CommentData,
  ObjectCardElement,
  PatientReferral,
} from "properties/types";
import React from "react";
import { View, Text } from "react-native";
import { formatDate } from "services/utils";

import Overlay from "./Overlay";
import ObjectCard from "../cards/ObjectCard";

const ReferralOverviewOverlay: React.FC<{
  isVisible: boolean;
  handleClose: () => void;
  referral: PatientReferral | null;
}> = ({ isVisible, handleClose, referral }) => {
  if (referral) {
    const commentInfo: CommentData = {
      text: referral.commentContent,
      date: formatDate(referral.modifiedDate),
      author: "", // this data will not be used
    };
    const referralInfo: ObjectCardElement[] = [
      {
        key: "Data wystawienia",
        value: formatDate(referral.modifiedDate),
      },
      {
        key: "Wystawiający",
        value: "" + referral.doctorId,
      },
      {
        key: "Numer skierowania:",
        value: referral.referralNumber,
      },
    ];
    return (
      <Overlay isVisible={isVisible}>
        <Overlay.Container>
          <Overlay.Header
            title={"Skierowanie: " + referral.testType}
            handleClose={handleClose}
          />
          <Overlay.Body>
            <ObjectCard data={referralInfo} keyStyle={cardStyle.title} />
          </Overlay.Body>
          <Overlay.Footer>
            <View style={cardStyle.container}>
              <Text style={cardStyle.title}>Komentarz</Text>
              {(referral.commentId && (
                <Comment item={commentInfo} index={0} dontShowAuthor />
              )) ||
                (!referral.commentId && <Text>Brak komentarza</Text>)}
            </View>
          </Overlay.Footer>
        </Overlay.Container>
      </Overlay>
    );
  }
};

export default ReferralOverviewOverlay;
