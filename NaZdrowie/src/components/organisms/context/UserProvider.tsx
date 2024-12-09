import { UserData } from "properties/types";
import React, { createContext, useState } from "react";
import { setUserIdForAxios } from "services/axios";

type UserProviderDispatch = {
  currentUser: UserData;
  setCurrentUser: (userData: UserData) => void;
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
