import { PrimaryButton } from "components/atoms";
import { CommentsCard, ListCard } from "components/molecules";
import {
  QueryWrapper,
  useDesiredOverlay,
  useScreensNavigation,
} from "components/organisms";
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

  const { navigateToAllReferrals, navigateToAllResults, navigateToAllHealthComments } =
    useScreensNavigation();

  return (
    <ScrollView contentContainerStyle={mainStyle.container}>
      <View style={mainStyle.buttonContainer}>
        <PrimaryButton
          title="Wypełnij formularz zdrowia"
          handleOnClick={() => {
            openHealthFormFillOverlay(currentUser.id);
          }}
          icon="form"
        />
        <PrimaryButton
          title="Załącz wynik badania"
          handleOnClick={() => openResultsFormOverlay(currentUser.id)}
          icon="document-attach-outline"
        />
        <PrimaryButton
          title="Dodaj lekarza"
          handleOnClick={() => navigateToQrScanner()}
          icon="scan"
        />
        <PrimaryButton title="Czaty z lekarzami" icon="chatbubbles-outline" />
      </View>
      <QueryWrapper
        temporaryTitle="Moje zdrowie"
        queries={[latestHealthComments]}
        renderSuccess={([healthComments]) => (
          <CommentsCard title="Moje zdrowie" data={healthComments} handleSeeMore={() => navigateToAllHealthComments(currentUser.id)} />
        )}
      />
      <QueryWrapper
        temporaryTitle="Moje skierowania"
        queries={[latestReferrals]}
        renderSuccess={([referrals]) => (
          <ListCard
            title="Moje skierowania"
            data={referrals}
            handleSeeMore={() => navigateToAllReferrals(currentUser.id)}
          />
        )}
      />
      <QueryWrapper
        queries={[latestResults, latestHealthForm]}
        temporaryTitle="Moje dane"
        renderSuccess={([results, healthForm]) => (
          <ListCard
            title="Moje wyniki"
            data={[...healthForm, ...results]}
            handleSeeMore={() => navigateToAllResults(currentUser.id)}
          />
        )}
      />
    </ScrollView>
  );
};
