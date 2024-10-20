import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import {
  LoginScreen,
  RegisterScreen,
  ChoiceScreen,
} from "screens/authentication";
import {
  AllPatientsScreen,
  PatientDetailsScreen,
  AiDiagnosis,
} from "screens/doctorScreens";
import { MainScreen } from "screens/main";
import { UserProvider } from "services/UserProvider";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Login: undefined;
  Register: { doctorScreen: boolean };
  Choice: undefined;
  MainScreen: undefined;
  AllPatients: undefined;
  PatientDetails: { patientId: number };
  AiDiagnosis: { patientId: number };
};

const App = (): React.JSX.Element => {
  return (
    <UserProvider>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Logowanie" }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: "Rejestracja" }}
            />
            <Stack.Screen
              name="Choice"
              component={ChoiceScreen}
              options={{ title: "Logowanie" }}
            />
            <Stack.Screen
              name="MainScreen"
              component={MainScreen}
              options={{ title: "Strona główna" }}
            />
            <Stack.Screen
              name="AllPatients"
              component={AllPatientsScreen}
              options={{ title: "Moi pacjenci" }}
            />
            <Stack.Screen
              name="PatientDetails"
              component={PatientDetailsScreen}
              options={{ title: "Dane pacjenta" }}
            />
            <Stack.Screen
              name="AiDiagnosis"
              component={AiDiagnosis}
              options={{ title: "Diagnozuj z AI" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </UserProvider>
  );
};

export default App;
