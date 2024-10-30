import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { UserButton, UserButtonElement } from "components/atoms";
import { Navbar } from "components/molecules";
import primaryColors from "properties/colors";
import { paddingSize } from "properties/vars";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { UserContext } from "services/UserProvider";
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

const AllPatientsScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "AllPatients">) => {
  const  {currentUser } = useContext(UserContext);
  const [allPatientsData, setAllPatientsData] = useState<UserButtonElement[]>(
    [],
  );

  useEffect(() => {
    setAllPatients(currentUser.id);
  }, []);

  const navigateToPatientScreen = (patientId: number) => {
    navigation.navigate("PatientDetails", {
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
