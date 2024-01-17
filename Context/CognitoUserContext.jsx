/**
 * This code defines a React context and provider component for managing a Cognito user object.
 * @returns The code is returning a Context Provider component called `CogUser` and a memoized version
 * of the Context Provider component called `MemoizedCognitoUserProvider`.
 */
import React from "react";

// Creating the context
export const CognitoUserContext = React.createContext({
  cognitoUser: null,
  setcognitoUser: () => {},
});

// Context Provider component
// eslint-disable-next-line react/prop-types
const CogUser = ({ children }) => {
  // State for to hold email responses
  const [cognitoUser, setcognitoUser] = React.useState(null);

  // Memoizing context provider value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      cognitoUser,
      setcognitoUser,
    }),
    [cognitoUser, setcognitoUser]
  );

  // Providing context value to children
  return (
    <CognitoUserContext.Provider value={value}>
      {children}
    </CognitoUserContext.Provider>
  );
};

// Memoizing the InputProvider component to avoid unwanted re-renders
export const MemoizedCognitoUserProvider = React.memo(CogUser);
