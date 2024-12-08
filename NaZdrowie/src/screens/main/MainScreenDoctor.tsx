import { PrimaryButton } from "components/atoms";
import { ListCard, LoadingCard } from "components/molecules";
import { useDesiredOverlay, useScreensNavigation } from "components/organisms";
import { UserContext } from "components/organisms/context";
import { useDoctorData, useResultsData } from "components/organisms/dataHooks";
import { mainStyle } from "properties/styles/mainStyle";
import React, { useContext } from "react";
import { View, ScrollView } from "react-native";

export const MainScreenDoctor = () => {
  const { currentUser } = useContext(UserContext);

  const { prepareLatestPatients } = useDoctorData(currentUser);
  const { navigateToNewPatientsScreen } = useScreensNavigation();

  const { prepareUnviewedResults } = useResultsData(currentUser);
  const { openQrDisplayOverlay } = useDesiredOverlay(currentUser);
  const { navigateToAllPatientsScreen } = useScreensNavigation();

  const unviewedResults = prepareUnviewedResults();
  const latestPatients = prepareLatestPatients();
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
