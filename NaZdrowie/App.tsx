import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import PatientScreen from "src/screens/doctorScreens/PatientScreen";

import ChoiceScreen from "./src/screens/authentication/ChoiceScreen";
import LoginScreen from "./src/screens/authentication/LoginScreen";
import RegisterScreen from "./src/screens/authentication/RegisterScreen";
import AllPatientsScreen from "./src/screens/doctorScreens/AllPatientsScreen";
import MainScreen from "./src/screens/main/MainScreen";

const Stack = createNativeStackNavigator();

const App = (): React.JSX.Element => {
  return (
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
            component={PatientScreen}
            options={{ title: "Dane pacjenta" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
