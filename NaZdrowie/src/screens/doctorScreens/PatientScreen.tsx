import { LinkButton, PrimaryButton } from "components/atoms";
import { CommentsCardForDoctor, ListCard, Navbar } from "components/molecules";
import primaryColors from "properties/colors";
import { paddingSize } from "properties/vars";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

const patientStyle = StyleSheet.create({
  container: {
    backgroundColor: primaryColors.babyBlue,
    paddingHorizontal: paddingSize.medium,
    paddingVertical: paddingSize.mediumBig,
    rowGap: paddingSize.mediumBig,
  },
  buttonContainer: {
    paddingHorizontal: paddingSize.mediumBig,
    rowGap: paddingSize.small,
  },
});

const PatientScreen = ({ route, navigation }) => {
  const { patientId } = route.params;

  const navigateToAllReferals = () => {
    // TODO
  };

  const navigateToAllResults = () => {
    // TODO
  };

  return (
    <View style={{ flex: 1 }}>
      <Navbar navbarDescriptionTitle={"Alicja Jakaśtam " + patientId} />
      <ScrollView contentContainerStyle={patientStyle.container}>
        <View style={patientStyle.buttonContainer}>
          <PrimaryButton title="Diagnozuj z AI" />
          <PrimaryButton title="Czat z pacjentem" />
          <PrimaryButton title="Załącz wynik badania" />
          <PrimaryButton title="Wystaw skierowanie" />
        </View>
        <CommentsCardForDoctor
          title="Zdrowie pacjenta"
          data={[
            {
              date: "12.03.2024",
              text: "Lorem ipsum tralala",
              author: "Jolanta Biel",
            },
            {
              date: "01.01.2024",
              text: "Lorem ipsum tralala",
              author: "Jolanta Biel",
            },
          ]}
          dataOthers={[
            {
              date: "12.03.2024",
              text: "Lorem ipsum tralala",
              author: "Jolanta Biel",
            },
            {
              date: "01.01.2024",
              text: "Lorem ipsum tralala",
              author: "Kazimierz Trąbalski",
            },
          ]}
        />
        <ListCard
          title="Skierowania pacjenta"
          data={[
            {
              text: "USG piersi",
              buttons: [
                <LinkButton title="Podgląd" color={primaryColors.lightBlue} />,
              ],
            },
            {
              text: "Mammografia",
              buttons: [
                <LinkButton title="Podgląd" color={primaryColors.lightBlue} />,
              ],
            },
          ]}
          handleSeeMore={navigateToAllReferals}
        />
        <ListCard
          title="Wyniki pacjenta"
          data={[
            {
              text: "Cytologia",
              buttons: [
                <LinkButton title="Przejdź" color={primaryColors.lightBlue} />,
              ],
            },
            {
              text: "Mammografia",
              buttons: [
                <LinkButton title="Przejdź" color={primaryColors.lightBlue} />,
              ],
            },
          ]}
          handleSeeMore={navigateToAllResults}
        />
      </ScrollView>
    </View>
  );
};

export default PatientScreen;
