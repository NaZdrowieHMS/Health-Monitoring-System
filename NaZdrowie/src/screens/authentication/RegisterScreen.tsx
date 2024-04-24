import React from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import TextInputPersonalized from '../../components/TextInputPersonalized';
import loginScreenStyle from '../../properties/styles/loginScreenStyle';
import LinkButton from '../../components/LinkButton';
import primaryColors from '../../properties/colors';

function LoginScreen() {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={loginScreenStyle.container}>
        <View>
          <Text style={loginScreenStyle.h1}>Na Zdrowie!</Text>
          <Text style={loginScreenStyle.h2}>
            Zarejestruj się na swoje konto
          </Text>
        </View>
        <View style={loginScreenStyle.inputContainer}>
          <TextInputPersonalized placeholder="login" />
          <View>
            <TextInputPersonalized placeholder="password" />
            <LinkButton
              title="Zapomniałeś hasła?"
              color={primaryColors.lightGrey}
            />
          </View>
        </View>
        <View>
          <PrimaryButton title="Zaloguj się" />
          <LinkButton
            title="Zarejestruj się"
            color={primaryColors.darkGrey}
            helperText="Nie masz konta?"
            fontWeight="bold"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;
