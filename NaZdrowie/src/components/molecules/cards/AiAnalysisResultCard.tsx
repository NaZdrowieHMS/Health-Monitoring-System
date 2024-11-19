import { LinkButton } from "components/atoms";
import primaryColors from "properties/colors";
import { cardStyle, generalStyle } from "properties/styles";
import { AiAnalysisResultCardProps } from "properties/types";
import { paddingSize } from "properties/vars";
import React from "react";
import { View, Text } from "react-native";

export const AiAnalysisResultCard: React.FC<(AiAnalysisResultCardProps)> = (
  {data},
) => {

  return (
    <View style={cardStyle.container}>
      <Text style={generalStyle.titleText}>
        Wyniki poprzednich analiz AI
      </Text>
      {data.map((prediction, index) => (
        <View key={index} style={{ rowGap: paddingSize.mediumBig }}>
          <Text style={generalStyle.titleText}>
            {prediction.status}
          </Text>
          <Text style={generalStyle.basicText}>
            {prediction.createdDate}
          </Text>
          <Text
            style={[
              generalStyle.secondaryTitle,
              {
                color:
                  prediction.confidence < 50
                    ? primaryColors.red
                    : primaryColors.lightGreen,
              },
            ]}
          >
            {`${prediction.prediction ? prediction.prediction : "N/A"} ${prediction.confidence ? prediction.confidence.toPrecision(6) : "N/A"}%`}
          </Text>
          <Text style={generalStyle.titleText}>
            Wynik opierał się na wynikach:
          </Text>
          <Text style={generalStyle.basicText}>
            {prediction.sourceResults.map((resultId) => `ID ${resultId}, `)}
          </Text>
        </View>
      ))}
      <LinkButton title="Historia przeprowadzonych analiz" />
    </View>
  );
};
