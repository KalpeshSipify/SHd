/**
 * This code defines a React context and a context provider component for managing a boolean value
 * called "reCall".
 * @returns The code is returning the `ReCallProvider` component and the `MemoizedReCallProvider`
 * component.
 */
import React from "react";

// Creating the context
export const FunAccountApiReCallContext = React.createContext({
  FundApireCall: false,
  setFundApireCall: () => {},
});

// Context Provider component
// eslint-disable-next-line react/prop-types
const FundApiReCallProvider = ({ children }) => {
  // State for is RelCall
  const [FundApireCall, setFundApireCall] = React.useState(false);

  // Memoizing context provider value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      FundApireCall,
      setFundApireCall,
    }),
    [FundApireCall, setFundApireCall]
  );
  // Providing context value to children
  return (
    <FunAccountApiReCallContext.Provider value={value}>
      {children}
    </FunAccountApiReCallContext.Provider>
  );
};

// Memoizing the InputProvider component to avoid unwanted re-renders
export const MemoizedFunAccountApiReCallProvider = React.memo(
  FundApiReCallProvider
);
