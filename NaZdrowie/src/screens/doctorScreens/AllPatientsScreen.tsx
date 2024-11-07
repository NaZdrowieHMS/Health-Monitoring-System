import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { UserButton, UserButtonElement } from "components/atoms";
import { Navbar } from "components/molecules";
import { mainStyle } from "properties/styles";
import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { UserContext } from "services/context";
import { getAllPatients } from "services/doctorData";

export const AllPatientsScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "AllPatients">) => {
  const { currentUser } = useContext(UserContext);
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
      <ScrollView contentContainerStyle={mainStyle.container}>
        {allPatientsData}
      </ScrollView>
    </View>
  );
};
