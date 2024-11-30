import { LoadingCard, Navbar } from "components/molecules";
import { usePatientData } from "components/organisms";
import { UserContext } from "components/organisms/context";
import { generalStyle, mainStyle } from "properties/styles";
import { useContext } from "react";
import { ScrollView, SafeAreaView } from "react-native";

export const AllPatientsScreen = () => {
  const { currentUser } = useContext(UserContext);

  const { allPatients } = usePatientData(currentUser);

  return (
    <>
      <Navbar navbarDescriptionTitle="Moi pacjenci" />
      <SafeAreaView style={generalStyle.safeArea}>
        <ScrollView contentContainerStyle={mainStyle.container}>
          {allPatients.isSuccess ? allPatients.data : <LoadingCard />}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
