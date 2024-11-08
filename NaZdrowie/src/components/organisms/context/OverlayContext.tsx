import React, { createContext, ReactNode, useContext, useState } from "react";

type OverlayContextDispatch = {
  showOverlay: (content: () => ReactNode) => void;
  hideOverlay: () => void;
  isOverlayOpen: boolean;
};

const OverlayContext = createContext<OverlayContextDispatch | undefined>(
  undefined,
);

export const OverlayProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [overlayStack, setOverlayStack] = useState<(() => ReactNode)[]>([]);

  const showOverlay = (content: () => ReactNode) => {
    setOverlayStack((prevStack) => [...prevStack, content]);
  };

  const hideOverlay = () => {
    setOverlayStack((prevStack) => prevStack.slice(0, -1));
  };
  return (
    <OverlayContext.Provider
      value={{
        showOverlay,
        hideOverlay,
        isOverlayOpen: overlayStack.length > 0,
      }}
    >
      {children}
      {overlayStack.length > 0 && (
        <>{overlayStack[overlayStack.length - 1]()}</>
      )}
    </OverlayContext.Provider>
  );
};

// Custom hook for accessing overlay context
export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (context === undefined) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
};
