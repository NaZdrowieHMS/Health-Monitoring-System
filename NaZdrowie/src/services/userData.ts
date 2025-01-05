import { useMutation } from "@tanstack/react-query";
import { UserLoginData, UserRegisterData } from "properties/types";

import { axiosApi } from "./axios";
import Toast from "react-native-toast-message";

export const useRegisterUser = () => {
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
    },
    onError(error) {
      Toast.show({
        type: "error",
        text1: "Bład w trakcie rejestracji nowego użytkownika",
        text2: "Wiadomość błędu: " + error.message,
      });
    },
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: async (userData: UserLoginData) => {
      const { data } = await axiosApi.post("users/login", userData);
      return data;
    },
    onSuccess() {
      Toast.show({
        type: "success",
        text1: "Pomyślnie zalogowano użytkownika",
      });
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
