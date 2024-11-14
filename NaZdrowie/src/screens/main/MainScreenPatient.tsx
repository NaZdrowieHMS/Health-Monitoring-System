import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { PrimaryButton } from "components/atoms";
import { CommentsCard, ListCard, LoadingCard } from "components/molecules";
import { useDesiredOverlay, usePatientData } from "components/organisms";
import { UserContext } from "components/organisms/context";
import { useCameraPermissions } from "expo-image-picker";
import { mainStyle } from "properties/styles";
import React, { useContext } from "react";
import { View, ScrollView, Alert, Linking } from "react-native";

export const MainScreenPatient = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "MainScreen">) => {
  const { currentUser } = useContext(UserContext);

  const { healthComments, referrals, results } = usePatientData(
    navigation,
    currentUser,
  );

  const {
    openCommentsOverlay,
    openResultsFormOverlay,
    openHealthFormFillOverlay,
  } = useDesiredOverlay(currentUser);

  const [, requestPermission] = useCameraPermissions();

  // dk if the navigation should be separated too
  const navigateToQrScannerScreen = async () => {
    const { status } = await requestPermission();

    if (status === "granted") {
      navigation.navigate("QrScanner");
    } else {
      // This needs to be replaced with our custom alert or sth
      Alert.alert(
        "Permission required",
        "Permission to use the camera is required to scan QR codes. Please enable it in your settings.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ],
      );
    }
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
      {healthComments.isSuccess && referrals.isSuccess && results.isSuccess ? (
        <>
          <CommentsCard
            title="Moje zdrowie"
            data={healthComments.data}
            handleSeeMore={() => openCommentsOverlay(healthComments.data)}
          />
          <ListCard title="Moje skierowania" data={referrals.data} />
          <ListCard title="Moje wyniki" data={results.data} />
        </>
      ) : (
        <LoadingCard />
      )}
    </ScrollView>
  );
};
