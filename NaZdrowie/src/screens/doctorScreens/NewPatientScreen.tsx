import { PersonalizedTextInput } from "components/atoms";
import { Navbar } from "components/molecules";
import { QueryWrapper } from "components/organisms";
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
          <QueryWrapper
            queries={[unassignedPatients]}
            renderSuccess={([patients]) => (
              <>
                {filteredUnassignedPatients(patients, filterValue).map(
                  (patient) => patient.button,
                )}
              </>
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
