import { UserButton } from "components/atoms";
import { UserButtonElement } from "components/atoms/buttons/UserButton";
import { Navbar } from "components/molecules";
import primaryColors from "properties/colors";
import { paddingSize } from "properties/vars";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { CurrentUserData } from "services/config";
import { getAllPatients } from "services/doctorData";

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
  const [allPatientsData, setAllPatientsData] = useState<UserButtonElement[]>(
    [],
  );

  useEffect(() => {
    setAllPatients(CurrentUserData.id);
  }, []);

  const navigateToPatientScreen = (patientId: number) => {
    navigation.navigate("Patient", {
      patientId,
    });
  };

  const setAllPatients = (doctorId: number) =>
    getAllPatients(doctorId).then((data) => {
      setAllPatientsData(
        data.map((patient) => (
          <UserButton
            key={patient.id}
            title={patient.name}
            handleOnClick={() => navigateToPatientScreen(patient.id)}
          />
        )),
      );
    });

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
