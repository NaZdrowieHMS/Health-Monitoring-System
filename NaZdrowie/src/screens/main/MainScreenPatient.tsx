import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { PrimaryButton } from "components/atoms";
import { CommentsCard, ListCard, LoadingCard } from "components/molecules";
import { useDesiredOverlay, usePatientData } from "components/organisms";
import { UserContext } from "components/organisms/context";
import { useResultsData } from "components/organisms/useResultsData";
import { mainStyle } from "properties/styles";
import React, { useContext } from "react";
import { View, ScrollView, Text } from "react-native";

export const MainScreenPatient = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "MainScreen">) => {
  const { currentUser } = useContext(UserContext);

  const {
    latestHealthComments,
    latestReferrals,
    latestHealthForm,
    navigateToQrScannerScreen,
  } = usePatientData(navigation, currentUser);

  const { latestResults } = useResultsData(navigation, currentUser);

  const {
    openCommentsOverlay,
    openResultsFormOverlay,
    openHealthFormFillOverlay,
  } = useDesiredOverlay(currentUser);

  const navigateToAllReferals = () => {
    // TODO
  };

  const navigateToAllResults = () => {
    navigation.navigate("AllResults", { patientId: currentUser.id });
  };

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
      {latestHealthComments.isSuccess &&
      latestReferrals.isSuccess &&
      latestResults.isSuccess &&
      latestHealthForm.isSuccess ? (
        <>
          <CommentsCard
            title="Moje zdrowie"
            data={latestHealthComments.data}
            handleSeeMore={() => openCommentsOverlay(latestHealthComments.data)}
          />
          <ListCard
            title="Moje skierowania"
            data={latestReferrals.data}
            handleSeeMore={navigateToAllReferals}
          />
          <ListCard
            title="Moje wyniki"
            data={[...latestResults.data, ...latestHealthForm.data]}
            handleSeeMore={navigateToAllResults}
          />
        </>
      ) : (
        <LoadingCard />
      )}
    </ScrollView>
  );
};
