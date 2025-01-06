import { useMutation } from "@tanstack/react-query";
import {
  UserLoginData,
  UserLoginDataResponse,
  UserRegisterData,
} from "properties/types";

import { axiosApi } from "./axios";
import Toast from "react-native-toast-message";

export const useRegisterUser = (navigateToLoginScreen: () => void) => {
  return useMutation({
    mutationFn: async (userData: UserRegisterData) => {
      const { data } = await axiosApi.post("users/register", userData);
      return data;
    },
    onSuccess() {
      Toast.show({
        type: "success",
        text1: "Pomyślnie zarejestrowano nowego użytkownika",
      });
      navigateToLoginScreen();
    },
    onError(error) {
      console.error(error.message, error.stack);
      Toast.show({
        type: "error",
        text1: "Bład w trakcie rejestracji nowego użytkownika",
        text2: "Wiadomość błędu: " + error.message,
      });
    },
  });
};

export const useLoginUser = (
  navigateToMainScreen: () => void,
  setUserData: (userData: UserLoginDataResponse) => void,
) => {
  return useMutation({
    mutationFn: async (userData: UserLoginData) => {
      const { data } = await axiosApi.post("users/login", userData);
      return data;
    },
    onSuccess(userData: UserLoginDataResponse) {
      Toast.show({
        type: "success",
        text1: "Pomyślnie zalogowano użytkownika",
      });
      setUserData(userData);
      navigateToMainScreen();
    },
    onError(error) {
      Toast.show({
        type: "error",
        text1: "Bład w trakcie logowania użytkownika",
        text2: "Wiadomość błędu: " + error.message,
      });
    },
  });
};
