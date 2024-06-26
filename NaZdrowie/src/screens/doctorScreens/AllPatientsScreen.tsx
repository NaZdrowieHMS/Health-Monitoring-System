import { UserButton } from "components/atoms";
import { Navbar } from "components/molecules";
import primaryColors from "properties/colors";
import { paddingSize } from "properties/vars";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { getAllPatients } from "services/doctorScreenData";

const allPatientsStyle = StyleSheet.create({
  container: {
    backgroundColor: primaryColors.babyBlue,
    paddingHorizontal: paddingSize.medium,
    paddingVertical: paddingSize.mediumBig,
    rowGap: paddingSize.mediumBig,
  },
  buttonContainer: {
    paddingHorizontal: paddingSize.mediumBig,
    rowGap: paddingSize.small,
  },
});

const AllPatientsScreen = ({ navigation }) => {
  const navigateToPatientScreen = (patientId: number) => {
    navigation.navigate("Patient", {
      patientId,
    });
  };

  const allPatientsData = getAllPatients().map((patient) => (
    <UserButton
      key={patient.patientId}
      title={patient.patientName}
      handleOnClick={() => navigateToPatientScreen(patient.patientId)}
    />
  ));

  return (
    <View style={{ flex: 1 }}>
      <Navbar navbarDescriptionTitle="Moi pacjenci" />
      <ScrollView contentContainerStyle={allPatientsStyle.container}>
        {allPatientsData}
      </ScrollView>
    </View>
  );
};

export default AllPatientsScreen;
