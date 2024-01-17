/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

// Creating the context
export const FundAccountValidationIDContext = React.createContext({
  FAV_ID: null,
  setFAV_ID: () => {},
});

// Context Provider component

const FAVIDProvider = ({ children }) => {
  // State for to hold email responses
  const [FAV_ID, setFAV_ID] = React.useState(null);

  // Memoizing context provider value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      FAV_ID,
      setFAV_ID,
    }),
    [FAV_ID, setFAV_ID]
  );

  // Providing context value to children
  return (
    <FundAccountValidationIDContext.Provider value={value}>
      {children}
    </FundAccountValidationIDContext.Provider>
  );
};

// Memoizing the InputProvider component to avoid unwanted re-renders
export const MemoizedFundAccountValidationIDProvider =
  React.memo(FAVIDProvider);
