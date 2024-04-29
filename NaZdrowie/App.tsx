import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView } from "react-native";

import ChoiceScreen from "./src/screens/authentication/ChoiceScreen";
import LoginScreen from "./src/screens/authentication/LoginScreen";
import RegisterScreen from "./src/screens/authentication/RegisterScreen";

const Stack = createNativeStackNavigator();

const App = (): React.JSX.Element => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Choice" component={ChoiceScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
