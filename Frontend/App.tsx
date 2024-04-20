import React from 'react';
import {SafeAreaView} from 'react-native';

import LoginScreen from './src/screens/authentication/LoginScreen';

const App = (): React.JSX.Element => {
  return (
    <SafeAreaView>
      <LoginScreen />
    </SafeAreaView>
  );
};

export default App;
