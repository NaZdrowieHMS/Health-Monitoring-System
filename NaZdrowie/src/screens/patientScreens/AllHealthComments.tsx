import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Navbar } from "components/molecules";
import { SafeAreaView, ScrollView } from "react-native";
import { generalStyle, mainStyle } from "properties/styles";
import { useContext } from "react";
import { UserContext } from "components/organisms/context";
import { useFetchPatient } from "services/patientData";
import { RootStackParamList } from "App";
import { useCommentsData } from "components/organisms/dataHooks";
import { QueryWrapper } from "components/organisms";
import Toast from "react-native-toast-message";
import { CurrentCommentDoctorCard } from "components/molecules/cards/CurrentCommentDoctorCard";
import { OtherCommentsDoctorCard } from "components/molecules/cards/OtherCommentsDoctorCard";
import React from "react";

export const AllHealthComments = ({
  route,
}: NativeStackScreenProps<RootStackParamList, "AllHealthComments">) => {
  const { currentUser } = useContext(UserContext);
  const { patientId } = route.params;
  const patientQuery = useFetchPatient(currentUser, null, patientId);
  const {
    prepareCurrentDoctorComments,
    prepareAllDoctorsComments,
    healthCommentUpload,
  } = useCommentsData(currentUser, patientId);

  const currentDoctorCommentsQuery = prepareCurrentDoctorComments();
  const allDoctorsComments = prepareAllDoctorsComments();

  return (
    <>
      {currentUser.isDoctor ? (
        <QueryWrapper
          queries={[patientQuery]}
          renderSuccess={([patient]) => (
            <Navbar
              navbarDescriptionTitle={`${patient.name} ${patient.surname}`}
              navbarDescriptionSubtitle="Komentarze zdrowia"
            />
          )}
          renderLoading={() => <Navbar navbarDescriptionTitle="..." />}
          renderError={(errors) => {
            Toast.show({
              type: "error",
              text1: "Błąd w pobieraniu informacji o pacjencie",
              text2: errors.join(", "),
            });
            return <Navbar navbarDescriptionTitle="..." />;
          }}
        />
      ) : (
        <Navbar navbarDescriptionTitle="Komentarze zdrowia" />
      )}
      <SafeAreaView style={generalStyle.safeArea}>
        <ScrollView contentContainerStyle={mainStyle.container}>
          <QueryWrapper
            queries={[currentDoctorCommentsQuery, allDoctorsComments]}
            renderSuccess={([currentDoctorComments, allDoctorsComments]) => {
              if (!currentUser.isDoctor) {
                return (
                  <OtherCommentsDoctorCard
                    dataOthers={allDoctorsComments}
                    title="Komentarze zdrowia"
                  />
                );
              }
              if (currentDoctorComments.length !== 0) {
                const indexToRemove = allDoctorsComments.findIndex(
                  (comment) =>
                    comment.author === currentDoctorComments[0].author &&
                    comment.date === currentDoctorComments[0].date &&
                    comment.text === currentDoctorComments[0].text,
                );

                if (indexToRemove !== -1) {
                  allDoctorsComments.splice(indexToRemove, 1);
                }
              }

              return (
                <>
                  <CurrentCommentDoctorCard
                    title={"Zdrowie pacjenta"}
                    data={currentDoctorComments}
                    commentUpload={healthCommentUpload}
                  />
                  <OtherCommentsDoctorCard
                    dataOthers={allDoctorsComments}
                    title="Pozostałe komentarze"
                  />
                </>
              );
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
