import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';

function LoginScreen() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View>
        <Text>Na zdrowie</Text>
        <PrimaryButton title="Cośtam" />
      </View>
    </ScrollView>
  );
}

export default LoginScreen;
