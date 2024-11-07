import { LinkButton } from "components/atoms";
import primaryColors from "properties/colors";
import { aiResultCardStyle, cardStyle, generalStyle } from "properties/styles";
import { paddingSize } from "properties/vars";
import React from "react";
import { View, Text } from "react-native";

const AiAnalysisResultCard: React.FC<object> = () => {
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
      <Text style={cardStyle.title}>
        Wyniki ostatnio przeprowadzonej analizy AI
      </Text>
      {mockedAiResults.map((result, index) => (
        <View key={index} style={{ rowGap: paddingSize.mediumBig }}>
          <Text
            style={[
              aiResultCardStyle.secondaryTitle,
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
      <Text style={cardStyle.title}>Zalecane badania</Text>
      <Text style={aiResultCardStyle.secondaryTitle}>
        W celu polepszenia dokładności analizy
      </Text>
      {mockedAiRefferals.map((refferal, index) => (
        <View style={cardStyle.cardElement} key={index}>
          <Text style={generalStyle.basicText}>{`• ${refferal.name}`}</Text>
          <LinkButton title="Zleć" color={primaryColors.lightBlue} />
        </View>
      ))}

      <LinkButton
        title="Historia przeprowadzonych analiz"
        color={primaryColors.lightBlue}
      />
    </View>
  );
};

export default AiAnalysisResultCard;
