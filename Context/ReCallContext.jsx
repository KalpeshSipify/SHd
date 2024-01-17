/**
 * This code defines a React context and a context provider component for managing a boolean value
 * called "reCall".
 * @returns The code is returning the `ReCallProvider` component and the `MemoizedReCallProvider`
 * component.
 */
import React from "react";

// Creating the context
export const ReCallContext = React.createContext({
  reCall: false,
  setreCall: () => {},
});

// Context Provider component
// eslint-disable-next-line react/prop-types
const ReCallProvider = ({ children }) => {
  // State for is RelCall
  const [reCall, setreCall] = React.useState(false);

  // Memoizing context provider value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      reCall,
      setreCall,
    }),
    [reCall, setreCall]
  );
  // Providing context value to children
  return (
    <ReCallContext.Provider value={value}>{children}</ReCallContext.Provider>
  );
};

// Memoizing the InputProvider component to avoid unwanted re-renders
export const MemoizedReCallProvider = React.memo(ReCallProvider);
