import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { PrimaryButton } from "components/atoms";
import { CommentsCard, ListCard } from "components/molecules";
import LoadingCard from "components/molecules/cards/LoadingCard";
import { usePatientData } from "components/organisms";
import { mainStyle } from "properties/styles";
import React, { useContext } from "react";
import { View, ScrollView } from "react-native";
import { UserContext } from "services/context";

const MainScreenPatient = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "MainScreen">) => {
  const { currentUser } = useContext(UserContext);

  const {
    healthComments,
    referrals,
    results,
    openHealthFormFillOverlay,
    openResultsFormOverlay,
    openCommentsOverlay,
  } = usePatientData(currentUser);

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
      {healthComments.isSuccess ? (
        <CommentsCard
          title="Moje zdrowie"
          data={healthComments.data}
          handleSeeMore={() => openCommentsOverlay(healthComments.data)}
        />
      ) : (
        <LoadingCard title="Moje zdrowie" />
      )}
      {referrals.isSuccess ? (
        <ListCard title="Moje skierowania" data={referrals.data} />
      ) : (
        <LoadingCard title="Moje skierowania" />
      )}
      {results.isSuccess ? (
        <ListCard title="Moje wyniki" data={results.data} />
      ) : (
        <LoadingCard title="Moje wyniki" />
      )}
    </ScrollView>
  );
};

export default MainScreenPatient;
