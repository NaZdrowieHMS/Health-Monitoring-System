import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { PrimaryButton } from "components/atoms";
import { CommentsCard, ListCard } from "components/molecules";
import { usePatientData } from "components/organisms/usePatientData";
import { mainStyle } from "properties/styles";
import React, { useContext, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { UserContext } from "services/context";

const MainScreenPatient = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "MainScreen">) => {
  const { currentUser } = useContext(UserContext);

  const {
    referralsData,
    resultsData,
    healthCommentsData,
    setHealthComments,
    setReferrals,
    setResults,
    openHealthFormFillOverlay,
    openResultsFormOverlay,
    openCommentsOverlay,
  } = usePatientData();

  useEffect(() => {
    setHealthComments(currentUser.id);
    setReferrals(currentUser.id);
    setResults(currentUser.id);
  }, []);

  return (
    <ScrollView contentContainerStyle={mainStyle.container}>
      <View style={mainStyle.buttonContainer}>
        <PrimaryButton
          title="Wypełnij formularz zdrowia"
          handleOnClick={() => {
            openHealthFormFillOverlay(currentUser.id);
          }}
        />
        <PrimaryButton
          title="Załącz wynik badania"
          handleOnClick={() => openResultsFormOverlay(currentUser.id)}
        />
        <PrimaryButton title="Dodaj lekarza" />
        <PrimaryButton title="Czaty z lekarzami" />
      </View>
      <CommentsCard
        title="Moje zdrowie"
        data={healthCommentsData}
        handleSeeMore={() => openCommentsOverlay(healthCommentsData)}
      />
      <ListCard title="Moje skierowania" data={referralsData} />
      <ListCard title="Moje wyniki" data={resultsData} />
    </ScrollView>
  );
};

export default MainScreenPatient;
