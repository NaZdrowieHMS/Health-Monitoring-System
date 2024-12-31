import React, { useContext } from "react";
import { ReferralProps } from "properties/types";
import { Text, View } from "react-native";
import {
  commentStyle,
  generalStyle,
  resultButtonStyle,
} from "properties/styles";
import { formatDate } from "services/utils";
import { LinkButton } from "components/atoms/buttons";
import { useDesiredOverlay } from "components/organisms";
import { UserContext } from "components/organisms/context";

export const ReferralEntry: React.FC<ReferralProps> = (
  props: ReferralProps,
) => {
  const { id, patientId, createdDate, title, completed } = props;
  const { currentUser } = useContext(UserContext);
  const { openReferralOverviewOverlay, openResultsFormOverlay } =
    useDesiredOverlay(currentUser);
  return (
    <View
      style={{
        ...resultButtonStyle.buttonContainer,
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text style={commentStyle.date}>{formatDate(createdDate)}</Text>
        <Text style={generalStyle.basicText}>{title}</Text>
      </View>
      <LinkButton
        title="Podgląd"
        handleOnClick={() => openReferralOverviewOverlay(id)}
      />
      {completed && (
        <LinkButton
          title="Załącz wynik"
          handleOnClick={() => openResultsFormOverlay(patientId, id, title)}
        />
      )}
    </View>
  );
};
