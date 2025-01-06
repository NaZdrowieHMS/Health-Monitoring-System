import { UserData, UserLoginDataResponse, UserRole } from "properties/types";
import React, { createContext, useState } from "react";
import { setUserIdForAxios, setUserTokenForAxios } from "services/axios";

type UserProviderDispatch = {
  currentUser: UserData;
  setCurrentUser: (userData: UserLoginDataResponse) => void;
};

const UserContext = createContext<UserProviderDispatch | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, updateCurrentUser] = useState<UserData>(null);

  const setCurrentUser = (userData: UserLoginDataResponse) => {
    setUserIdForAxios(userData.id);
    setUserTokenForAxios(userData.jwt);
    updateCurrentUser({
      id: userData.id,
      isDoctor: userData.role === UserRole.doctor,
    });
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
