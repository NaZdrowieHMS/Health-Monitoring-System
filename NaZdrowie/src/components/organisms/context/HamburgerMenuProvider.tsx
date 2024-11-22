import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type HamburgerMenuProviderDispatch = {
  isMenuVisible: boolean;
  setIsMenuVisible: Dispatch<SetStateAction<boolean>>;
};

const HamburgerMenuContext =
  createContext<HamburgerMenuProviderDispatch | null>(null);

const HamburgerMenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  return (
    <HamburgerMenuContext.Provider value={{ isMenuVisible, setIsMenuVisible }}>
      {children}
    </HamburgerMenuContext.Provider>
  );
};

export { HamburgerMenuContext, HamburgerMenuProvider };
