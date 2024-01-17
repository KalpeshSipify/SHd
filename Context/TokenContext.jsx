/**
 * This code defines a React context and a context provider component for managing the authentication
 * state in a React application.
 * @returns The code is returning the `IsAuthenticateProvider` component and the
 * `MemoizedIsAuthenticateProvider` component.
 */
import React from "react";

// Creating the context
export const TokenContext = React.createContext({
  Token: null,
  setToken: () => {},
  ApiKey: null,
  setApiKey: () => {},
});

// Context Provider component
// eslint-disable-next-line react/prop-types
const TokenProvider = ({ children }) => {
  // State for is authenticated Token
  const [Token, setToken] = React.useState(null);
  // State for is authenticated Api key
  const [ApiKey, setApiKey] = React.useState(null);

  // Memoizing context provider value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      Token,
      setToken,
      ApiKey,
      setApiKey,
    }),
    [Token, setToken, ApiKey, setApiKey]
  );

  // Providing context value to children
  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};

// Memoizing the InputProvider component to avoid unwanted re-renders
export const MemoizedIsTokenProvider = React.memo(TokenProvider);
