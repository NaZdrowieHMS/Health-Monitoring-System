import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { PrimaryButton } from "components/atoms";
import { ListCard, LoadingCard } from "components/molecules";
import { useDesiredOverlay, useDoctorData } from "components/organisms";
import { UserContext } from "components/organisms/context";
import { useResultsData } from "components/organisms/useResultsData";
import { mainStyle } from "properties/styles/mainStyle";
import React, { useContext } from "react";
import { View, ScrollView } from "react-native";

export const MainScreenDoctor = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "MainScreen">) => {
  const { currentUser } = useContext(UserContext);

  const { latestPatients, navigateToNewPatientsScreen } = useDoctorData(
    navigation,
    currentUser,
  );

  const { unviewedResults } = useResultsData(navigation, currentUser);

  const { openQrDisplayOverlay } = useDesiredOverlay(currentUser);
  const navigateToAllPatientsScreen = () => {
    navigation.navigate("AllPatients");
  };

  return (
    <ScrollView contentContainerStyle={mainStyle.container}>
      <View style={mainStyle.buttonContainer}>
        <PrimaryButton
          handleOnClick={navigateToAllPatientsScreen}
          title="Moi pacjenci"
        />
        <PrimaryButton title="Czaty z pacjentami" />
        <PrimaryButton
          title="Wygeneruj kod QR"
          handleOnClick={() => openQrDisplayOverlay()}
        />
        <PrimaryButton
          title="Znajdź nowego pacjenta"
          handleOnClick={navigateToNewPatientsScreen}
        />
      </View>
      {latestPatients.isSuccess && unviewedResults.isSuccess ? (
        <>
          <ListCard
            title="Ostatnio leczeni pacjenci"
            data={latestPatients.data}
          />
          <ListCard title="Nowe wyniki badań" data={unviewedResults.data} />
        </>
      ) : (
        <LoadingCard />
      )}
    </ScrollView>
  );
};
