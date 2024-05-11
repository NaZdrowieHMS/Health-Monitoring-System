import { LinkButton, PrimaryButton } from "components/atoms";
import { CommentsCard, ListCard } from "components/molecules";
import primaryColors from "properties/colors";
import React from "react";
import { View, ScrollView } from "react-native";

import { mainStyle } from "./MainScreen";

const MainScreenPatient = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={mainStyle.container}>
      <View style={mainStyle.buttonContainer}>
        <PrimaryButton title="Czaty z lekarzami" />
        <PrimaryButton title="Wypełnij formularz zdrowia" />
        <PrimaryButton title="Załącz wynik badania" />
        <PrimaryButton title="Dodaj lekarza kodem QR" />
      </View>
      <CommentsCard
        title="Moje zdrowie"
        data={[
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
        title="Moje skierowania"
        data={[
          {
            text: "USG piersi",
            buttons: [
              <LinkButton title="Podgląd" color={primaryColors.lightBlue} />,
              <LinkButton
                title="Załącz wynik"
                color={primaryColors.lightBlue}
              />,
            ],
          },
        ]}
      />
      <ListCard
        title="Moje wyniki"
        data={[
          {
            text: "Tomografia",
            buttons: [
              <LinkButton title="Podgląd" color={primaryColors.lightBlue} />,
            ],
          },
          {
            text: "USG piersi",
            buttons: [
              <LinkButton title="Podgląd" color={primaryColors.lightBlue} />,
            ],
          },
        ]}
      />
    </ScrollView>
  );
};

export default MainScreenPatient;
