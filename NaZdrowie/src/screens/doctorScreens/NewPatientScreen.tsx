import { PersonalizedTextInput } from "components/atoms";
import { LoadingCard, Navbar } from "components/molecules";
import { UserContext } from "components/organisms/context";
import { useDoctorData } from "components/organisms/dataHooks";
import { cardStyle, generalStyle, mainStyle } from "properties/styles";
import { useContext, useState } from "react";
import { View, ScrollView, Text, SafeAreaView } from "react-native";

export const NewPatientsScreen = () => {
  const { currentUser } = useContext(UserContext);
  const [filterValue, setFilterValue] = useState<string>("");

  const { prepareUnassignedPatients, filteredUnassignedPatients } =
    useDoctorData(currentUser);

  const unassignedPatients = prepareUnassignedPatients();
  return (
    <>
      <Navbar navbarDescriptionTitle="Nowi pacjenci" />
      <SafeAreaView style={generalStyle.safeArea}>
        <View style={cardStyle.container}>
          <Text style={generalStyle.titleText}>Znajdź Pacjenta</Text>
          <PersonalizedTextInput
            placeholder="Wpisz PESEL lub imię i nazwisko"
            onChange={setFilterValue}
          />
        </View>
        <ScrollView contentContainerStyle={mainStyle.container}>
          {unassignedPatients.isSuccess ? (
            filteredUnassignedPatients(
              unassignedPatients.data,
              filterValue,
            ).map((element) => element.button)
          ) : (
            <LoadingCard />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
