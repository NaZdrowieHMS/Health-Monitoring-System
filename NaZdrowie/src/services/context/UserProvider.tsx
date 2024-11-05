import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type UserData = {
  id: number;
  isDoctor: boolean;
};

type UserProviderDispatch = {
  // maybe a better name?
  currentUser: UserData;
  setCurrentUser: Dispatch<SetStateAction<{ id: number; isDoctor: boolean }>>;
};

const UserContext = createContext<UserProviderDispatch | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<UserData>({
    id: 2,
    isDoctor: false,
  });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider, UserData };
