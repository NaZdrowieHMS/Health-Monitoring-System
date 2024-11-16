import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { PrimaryButton } from "components/atoms";
import { CommentsCard, ListCard, LoadingCard } from "components/molecules";
import { useDesiredOverlay, usePatientData } from "components/organisms";
import { UserContext } from "components/organisms/context";
import { mainStyle } from "properties/styles";
import React, { useContext } from "react";
import { View, ScrollView } from "react-native";

export const MainScreenPatient = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "MainScreen">) => {
  const { currentUser } = useContext(UserContext);

  const {
    healthComments,
    latestReferrals,
    latestResults,
    navigateToQrScannerScreen,
  } = usePatientData(navigation, currentUser);

  const {
    openCommentsOverlay,
    openResultsFormOverlay,
    openHealthFormFillOverlay,
  } = useDesiredOverlay(currentUser);

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
        <PrimaryButton
          title="Dodaj lekarza"
          handleOnClick={() => navigateToQrScannerScreen()}
        />
        <PrimaryButton title="Czaty z lekarzami" />
      </View>
      {healthComments.isSuccess &&
      latestReferrals.isSuccess &&
      latestResults.isSuccess ? (
        <>
          <CommentsCard
            title="Moje zdrowie"
            data={healthComments.data}
            handleSeeMore={() => openCommentsOverlay(healthComments.data)}
          />
          <ListCard title="Moje skierowania" data={latestReferrals.data} />
          <ListCard title="Moje wyniki" data={latestResults.data} />
        </>
      ) : (
        <LoadingCard />
      )}
    </ScrollView>
  );
};
