import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";

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
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Choice" component={ChoiceScreen} />
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="AllPatients" component={AllPatientsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
