import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import AiDiagnosis from "src/screens/doctorScreens/AiDiagnosis";
import PatientDetailsScreen from "src/screens/doctorScreens/PatientDetailsScreen";

import ChoiceScreen from "./src/screens/authentication/ChoiceScreen";
import LoginScreen from "./src/screens/authentication/LoginScreen";
import RegisterScreen from "./src/screens/authentication/RegisterScreen";
import AllPatientsScreen from "./src/screens/doctorScreens/AllPatientsScreen";
import MainScreen from "./src/screens/main/MainScreen";
import {UserProvider} from "services/UserProvider";

const Stack = createNativeStackNavigator();

const App = (): React.JSX.Element => {
  return (
    <UserProvider>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              options={{ title: "Logowanie" }}
              component={LoginScreen}
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
              name="Patient"
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
