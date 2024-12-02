import { PrimaryButton } from "components/atoms";
import { CommentsCard, ListCard, LoadingCard } from "components/molecules";
import { useDesiredOverlay, useScreensNavigation } from "components/organisms";
import { UserContext } from "components/organisms/context";
import {
  useResultsData,
  useReferralsData,
  useCommentsData,
  useHealthFormData,
} from "components/organisms/dataHooks";
import { mainStyle } from "properties/styles";
import React, { useContext } from "react";
import { View, ScrollView } from "react-native";

export const MainScreenPatient = () => {
  const { currentUser } = useContext(UserContext);

  const { navigateToQrScanner } = useScreensNavigation();
  const { prepareLatestResults } = useResultsData(currentUser);
  const { prepareLatestReferrals } = useReferralsData(currentUser);
  const { prepareLatestHealthComments } = useCommentsData(currentUser);
  const { prepareLatestHealthForm } = useHealthFormData(currentUser);

  const latestResults = prepareLatestResults();
  const latestHealthForm = prepareLatestHealthForm();
  const latestReferrals = prepareLatestReferrals();
  const latestHealthComments = prepareLatestHealthComments();

  const { openResultsFormOverlay, openHealthFormFillOverlay } =
    useDesiredOverlay(currentUser);

  const { navigateToAllReferals, navigateToAllResults } =
    useScreensNavigation();

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
          handleOnClick={() => navigateToQrScanner()}
        />
        <PrimaryButton title="Czaty z lekarzami" />
      </View>
      {latestHealthComments.isSuccess &&
      latestReferrals.isSuccess &&
      latestResults.isSuccess &&
      latestHealthForm.isSuccess ? (
        <>
          <CommentsCard title="Moje zdrowie" data={latestHealthComments.data} />
          <ListCard
            title="Moje skierowania"
            data={latestReferrals.data}
            handleSeeMore={navigateToAllReferals}
          />
          <ListCard
            title="Moje wyniki"
            data={[...latestResults.data, ...latestHealthForm.data]}
            handleSeeMore={() => navigateToAllResults(currentUser.id)}
          />
        </>
      ) : (
        <LoadingCard />
      )}
    </ScrollView>
  );
};
