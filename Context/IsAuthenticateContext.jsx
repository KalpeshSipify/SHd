/**
 * This code defines a React context and a context provider component for managing the authentication
 * state in a React application.
 * @returns The code is returning the `IsAuthenticateProvider` component and the
 * `MemoizedIsAuthenticateProvider` component.
 */
import React from "react";

// Creating the context
export const IsAuthenticateContext = React.createContext({
  IsAuth: false,
  setIsAuth: () => {},
});

// Context Provider component
// eslint-disable-next-line react/prop-types
const IsAuthenticateProvider = ({ children }) => {
  // State for is authenticated
  const [IsAuth, setIsAuth] = React.useState(false);

  // Memoizing context provider value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      IsAuth,
      setIsAuth,
    }),
    [IsAuth, setIsAuth]
  );
  // Providing context value to children
  return (
    <IsAuthenticateContext.Provider value={value}>
      {children}
    </IsAuthenticateContext.Provider>
  );
};

// Memoizing the InputProvider component to avoid unwanted re-renders
export const MemoizedIsAuthenticateProvider = React.memo(
  IsAuthenticateProvider
);
