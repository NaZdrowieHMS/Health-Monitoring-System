import { Navbar } from "components/molecules";
import { QueryWrapper } from "components/organisms";
import { UserContext } from "components/organisms/context";
import { usePatientData } from "components/organisms/dataHooks";
import { generalStyle, mainStyle } from "properties/styles";
import React from "react";
import { useContext } from "react";
import { ScrollView, SafeAreaView } from "react-native";

export const AllPatientsScreen = () => {
  const { currentUser } = useContext(UserContext);

  const { prepareAllPatients } = usePatientData(currentUser);

  const allPatients = prepareAllPatients();
  return (
    <>
      <Navbar navbarDescriptionTitle="Moi pacjenci" />
      <SafeAreaView style={generalStyle.safeArea}>
        <ScrollView contentContainerStyle={mainStyle.container}>
          <QueryWrapper
            queries={[allPatients]}
            renderSuccess={([patients]) => <>{patients}</>}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
