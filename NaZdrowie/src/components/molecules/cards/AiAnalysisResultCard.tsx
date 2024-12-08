import { LinkButton, UnorderedListElement } from "components/atoms";
import primaryColors from "properties/colors";
import { aiDiagnosis, cardStyle, generalStyle } from "properties/styles";
import {
  AiAnalysisResultCardProps,
  PredictionOutcome,
  PredictionStatus,
} from "properties/types";
import { paddingSize } from "properties/vars";
import React from "react";
import { View, Text } from "react-native";

export const AiAnalysisResultCard: React.FC<AiAnalysisResultCardProps> = ({
  title,
  aiPrediction,
}) => {
  const preparePredictionText = (
    prediction: PredictionOutcome,
    confidence: number,
  ) => {
    switch (prediction) {
      case PredictionOutcome.benign:
        return (
          <Text style={aiDiagnosis.benignPrediction}>
            {`Drobne zmiany nowotworowe - pewność ${confidence.toPrecision(4)}%`}
          </Text>
        );
      case PredictionOutcome.malignant:
        return (
          <Text style={aiDiagnosis.malignantPrediction}>
            {`Nowotwór złośliwy - pewność ${confidence.toPrecision(4)}%`}
          </Text>
        );
      case PredictionOutcome.normal:
        return (
          <Text style={aiDiagnosis.malignantPrediction}>
            {`Brak nowotworu - pewność ${confidence.toPrecision(4)}%`}
          </Text>
        );
      // Need information what other possible outcomes can be
      default:
        return (
          <Text style={aiDiagnosis.otherPrediction}>
            {`Nieoczekiwana predykcja: ${prediction} - pewność ${confidence.toPrecision(4)}%`}
          </Text>
        );
    }
  };

  const handleAiPredictionStatus = () => {
    switch (aiPrediction.status) {
      case PredictionStatus.completed: {
        return (
          <>
            {preparePredictionText(
              aiPrediction.prediction,
              aiPrediction.confidence,
            )}
            <Text style={generalStyle.basicText}>Na podstawie wyników:</Text>
            {aiPrediction.sourceResults.map((result) => (
              <UnorderedListElement
                text={result.title}
                onClick={result.onClick}
                icon="document"
                color={primaryColors.darkBlue}
              />
            ))}
            <Text style={generalStyle.titleText}>
              Diagnoza dla Formularza zdrowia {aiPrediction.healthFormDate}
            </Text>
            {aiPrediction.diagnoses.map((diagnosis) => (
              <UnorderedListElement
                text={diagnosis}
                icon="warning"
                color={primaryColors.red}
              />
            ))}
            <Text style={generalStyle.titleText}>Zalecenia</Text>
            {aiPrediction.recommendations.map((recommendation) => (
              <UnorderedListElement
                text={recommendation}
                icon="checkcircle"
                color={primaryColors.lightGreen}
              />
            ))}
          </>
        );
      }
      case PredictionStatus.inProgress:
        return (
          <Text style={generalStyle.titleText}>
            Predykcja jest w trakcie przetwarzania...
          </Text>
        );

      case PredictionStatus.failed:
        return (
          <Text style={generalStyle.titleText}>
            Wystąpił błąd z przetwarzaniem predykcji.
          </Text>
        );
    }
  };

  return (
    <View style={cardStyle.container}>
      <Text style={generalStyle.titleText}>{title}</Text>
      <View style={{ rowGap: paddingSize.medium }}>
        {handleAiPredictionStatus()}
      </View>
      <LinkButton title="Historia przeprowadzonych analiz" />
    </View>
  );
};
