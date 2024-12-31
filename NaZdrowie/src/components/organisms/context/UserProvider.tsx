import { UserData } from "properties/types";
import React, { createContext, useEffect, useState } from "react";
import { setUserIdForAxios } from "services/axios";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from "services/config";
import Toast from "react-native-toast-message";

type UserProviderDispatch = {
  currentUser: UserData;
  setCurrentUser: (userData: UserData) => void;
  googleSignin: () => void;
  vanillaSignin: (email: string, password: string) => void;
};

const UserContext = createContext<UserProviderDispatch | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, updateCurrentUser] = useState<UserData>(null);
  const setCurrentUser = (userData: UserData) => {
    setUserIdForAxios(userData.id);
    updateCurrentUser(userData);
  };

  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  });

  const processUserInformationAndNavigateToMainScreen = (email: string) => {
    const userInfo = email.split("-");
    if (userInfo.length === 2 && userInfo[1].length > 0) {
      // temporary solution to try out different data
      setCurrentUser({
        id: parseInt(userInfo[1], 10),
        isDoctor: userInfo[0] !== "p",
      });
    } else if (email !== "patient") {
      setCurrentUser({ id: 1, isDoctor: true });
    } else {
      setCurrentUser({ id: 3, isDoctor: false });
    }
  };

  const vanillaSignin = (email: string, password: string) => {
    // here implement signin logic - later add password
    processUserInformationAndNavigateToMainScreen(email);
  };

  const googleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // setUserInfo(userInfo);
      // TODO get user ID from new login endpoint, or redirect to register page
      Toast.show({
        type: "success",
        text1: "Pomyślnie zalogowano",
        text2: `Witaj ${userInfo.data.user.name}`,
      });
      processUserInformationAndNavigateToMainScreen(userInfo.data.user.email);
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Wystąpił błąd w trakcie logowania",
        text2: `${error.message}`,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        googleSignin,
        vanillaSignin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
