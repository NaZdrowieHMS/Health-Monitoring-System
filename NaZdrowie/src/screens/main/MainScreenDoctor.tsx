import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { PrimaryButton } from "components/atoms";
import { ListCard, LoadingCard } from "components/molecules";
import { useDoctorData } from "components/organisms";
import { UserContext } from "components/organisms/context";
import { mainStyle } from "properties/styles/mainStyle";
import React, { useContext } from "react";
import { View, ScrollView, Text } from "react-native";

export const MainScreenDoctor = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "MainScreen">) => {
  const { currentUser } = useContext(UserContext);

  const { latestPatients, latestResults } = useDoctorData(
    navigation,
    currentUser,
  );

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
        <PrimaryButton title="Wygeneruj kod QR" />
        <PrimaryButton title="Znajdź nowego pacjenta" />
      </View>
      {latestPatients.isSuccess && latestResults.isSuccess ? (
        <>
          <ListCard
            title="Ostatnio leczeni pacjenci"
            data={latestPatients.data}
          />
          <ListCard
            title="Ostatnio załączone badania"
            data={latestResults.data}
          />
        </>
      ) : (
        <LoadingCard />
      )}

      <Text>{latestPatients.status}</Text>
      <Text>{latestResults.status}</Text>
    </ScrollView>
  );
};
