import { cardStyle, generalStyle } from "properties/styles";
import { AiAnalysisHealthFormCardProps } from "properties/types";
import { paddingSize } from "properties/vars";
import React from "react";
import { View, Text } from "react-native";
import { formatDate } from "services/utils";

export const AiAnalysisHealthFormCard: React.FC<
  AiAnalysisHealthFormCardProps
> = ({ title, data }) => {
  return (
    <View style={cardStyle.container}>
      <Text style={generalStyle.titleText}>{title}</Text>
      <Text style={generalStyle.basicText}>{formatDate(data.createdDate)}</Text>
      <View style={{ rowGap: paddingSize.medium }}>
        <Text style={generalStyle.secondaryTitle}>Diagnozy</Text>
        <Text style={generalStyle.basicText}>{data.diagnoses.join(", ")}</Text>
        <Text style={generalStyle.secondaryTitle}>Rekomendacje</Text>
        <Text style={generalStyle.basicText}>
          {data.recommendations.join(", ")}
        </Text>
      </View>
    </View>
  );
};
