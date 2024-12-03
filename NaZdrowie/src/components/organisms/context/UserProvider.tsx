import { UserData } from "properties/types";
import React, { createContext, useState } from "react";
import { setUserIdForAxios } from "services/axios";

type UserProviderDispatch = {
  currentUser: UserData;
  setCurrentUser: (userData: UserData) => void;
  latestHealthFormId: number;
  setLatestHealthFormId: React.Dispatch<React.SetStateAction<number>>;
};

const UserContext = createContext<UserProviderDispatch | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, updateCurrentUser] = useState<UserData>(null);
  const [latestHealthFormId, setLatestHealthFormId] = useState<number>(null);

  const setCurrentUser = (userData: UserData) => {
    setUserIdForAxios(userData.id);
    updateCurrentUser(userData);
  };
  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        latestHealthFormId,
        setLatestHealthFormId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
