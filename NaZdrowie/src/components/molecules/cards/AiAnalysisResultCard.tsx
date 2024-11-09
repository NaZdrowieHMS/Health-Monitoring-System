import { LinkButton } from "components/atoms";
import primaryColors from "properties/colors";
import { cardStyle, generalStyle } from "properties/styles";
import { paddingSize } from "properties/vars";
import React from "react";
import { View, Text } from "react-native";

export const AiAnalysisResultCard: React.FC<object> = () => {
  const mockedAiResults = [
    {
      diagnosis: "Nowotwór piersi",
      precision: 90,
      details: "Na podstawie podwyższonego poziomu czegoś tam i bla bla",
    },
    {
      diagnosis: "Nowotwór płuc",
      precision: 20,
      details: "Na podstawie podwyższonego poziomu czegoś tam i bla bla",
    },
  ];

  const mockedAiRefferals = [
    {
      name: "Cytologia",
    },
    { name: "Inne badanie jakiekolwiek" },
    { name: "jeszcze inne badanie" },
  ];
  return (
    <View style={cardStyle.container}>
      <Text style={generalStyle.titleText}>
        Wyniki ostatnio przeprowadzonej analizy AI
      </Text>
      {mockedAiResults.map((result, index) => (
        <View key={index} style={{ rowGap: paddingSize.mediumBig }}>
          <Text
            style={[
              generalStyle.secondaryTitle,
              {
                color:
                  result.precision < 50
                    ? primaryColors.lightGreen
                    : primaryColors.red,
              },
            ]}
          >
            {`${result.diagnosis} ${result.precision}%`}
          </Text>
          <Text style={generalStyle.basicText}>
            Na podstawie cokolwiek się dzieje i tak
          </Text>
        </View>
      ))}
      <Text style={generalStyle.titleText}>Zalecane badania</Text>
      <Text style={generalStyle.secondaryTitle}>
        W celu polepszenia dokładności analizy
      </Text>
      {mockedAiRefferals.map((refferal, index) => (
        <View style={cardStyle.cardElement} key={index}>
          <Text style={generalStyle.basicText}>{`• ${refferal.name}`}</Text>
          <LinkButton title="Zleć" />
        </View>
      ))}

      <LinkButton title="Historia przeprowadzonych analiz" />
    </View>
  );
};
