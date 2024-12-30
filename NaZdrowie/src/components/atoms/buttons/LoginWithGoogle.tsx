import { authenticationScreenStyle } from "properties/styles";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  SignInResponse,
} from "@react-native-google-signin/google-signin";
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from "services/config";

export const LoginWithGoogle: React.FC = () => {
  const [error, setError] = useState<Error>();
  const [userInfo, setUserInfo] = useState<SignInResponse>(null);

  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  });

  const signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };
  return (
    <View style={authenticationScreenStyle.buttonsContainer}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Dark}
        onPress={signin}
      />
      <Text>{`${error?.message} ${error?.name}`}</Text>
      <Text>{JSON.stringify(userInfo?.data.user)}</Text>
    </View>
  );
};
