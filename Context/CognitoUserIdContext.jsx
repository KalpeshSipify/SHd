/**
 * This code defines a React context and provider component for managing a Cognito user ID.
 * @returns The code is returning a Context Provider component called `CogUserId`. This component
 * creates a context using `React.createContext` and provides a state value `cognitoUserId` and a state
 * setter function `setcognitoUserId` to the context. The component also memoizes the context provider
 * value using `React.useMemo` to prevent unnecessary re-renders. Finally, the component returns the `C
 */
import React from "react";

// Creating the context
export const CognitoUserIdContext = React.createContext({
  cognitoUserId: null,
  setcognitoUserId: () => {},
});

// Context Provider component
// eslint-disable-next-line react/prop-types
const CogUserId = ({ children }) => {
  // State for to hold email responses
  const [cognitoUserId, setcognitoUserId] = React.useState(null);

  // Memoizing context provider value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      cognitoUserId,
      setcognitoUserId,
    }),
    [cognitoUserId, setcognitoUserId]
  );

  // Providing context value to children
  return (
    <CognitoUserIdContext.Provider value={value}>
      {children}
    </CognitoUserIdContext.Provider>
  );
};

// Memoizing the InputProvider component to avoid unwanted re-renders
export const MemoizedCognitoUserIdProvider = React.memo(CogUserId);
