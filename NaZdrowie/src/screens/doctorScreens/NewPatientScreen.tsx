import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { PersonalizedTextInput } from "components/atoms";
import { LoadingCard, Navbar } from "components/molecules";
import { useDoctorData } from "components/organisms";
import { UserContext } from "components/organisms/context";
import { cardStyle, generalStyle, mainStyle } from "properties/styles";
import { useContext, useState } from "react";
import { View, ScrollView, Text, SafeAreaView } from "react-native";

export const NewPatientsScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "NewPatients">) => {
  const { currentUser } = useContext(UserContext);
  const [filterValue, setFilterValue] = useState<string>("");

  const { unassignedPatients, filteredUnassignedPatients } = useDoctorData(
    navigation,
    currentUser,
  );

  return (
    <>
      <Navbar
        navbarDescriptionTitle="Nowi pacjenci"
        navigation={(path) => navigation.navigate(path)}
      />
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
            filteredUnassignedPatients(filterValue).map(
              (element) => element.button,
            )
          ) : (
            <LoadingCard />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
