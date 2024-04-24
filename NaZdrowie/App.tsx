import React from "react";
import { SafeAreaView } from "react-native";

import LoginScreen from "./src/screens/authentication/LoginScreen";

const App = (): React.JSX.Element => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{ flex: 1 }}>
      <LoginScreen />
    </SafeAreaView>
  );
};

export default App;
