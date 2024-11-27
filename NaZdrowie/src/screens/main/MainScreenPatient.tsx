import { PrimaryButton } from "components/atoms";
import { CommentsCard, ListCard, LoadingCard } from "components/molecules";
import {
  useCommentsData,
  useDesiredOverlay,
  useHealthFormData,
  useReferralsData,
  useResultsData,
  useScreensNavigation,
} from "components/organisms";
import { UserContext } from "components/organisms/context";
import { mainStyle } from "properties/styles";
import React, { useContext } from "react";
import { View, ScrollView } from "react-native";

export const MainScreenPatient = () => {
  const { currentUser } = useContext(UserContext);

  const { navigateToQrScanner } = useScreensNavigation();
  const { latestResults } = useResultsData(currentUser);
  const { latestReferrals } = useReferralsData(currentUser);
  const { latestHealthComments } = useCommentsData(currentUser);
  const { latestHealthForm } = useHealthFormData(currentUser);

  const {
    openCommentsOverlay,
    openResultsFormOverlay,
    openHealthFormFillOverlay,
  } = useDesiredOverlay(currentUser);

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
