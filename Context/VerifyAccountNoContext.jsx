/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

// Creating the context
export const VerifyAccountNoContext = React.createContext({
  VerifyAccountNo: "",
  setVerifyAccountNo: () => {},
});

// Context Provider component

// eslint-disable-next-line react/prop-types
const VerifyAccountNoProv = ({ children }) => {
  // State for to hold account No responses
  const [VerifyAccountNo, setVerifyAccountNo] =
    React.useState("7878780079405067");

  // Memoizing context provider value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      VerifyAccountNo,
      setVerifyAccountNo,
    }),
    [VerifyAccountNo, setVerifyAccountNo]
  );

  // Providing context value to children
  return (
    <VerifyAccountNoContext.Provider value={value}>
      {children}
    </VerifyAccountNoContext.Provider>
  );
};

// Memoizing the InputProvider component to avoid unwanted re-renders
export const MemoizedVerifyAccountNoProvider = React.memo(VerifyAccountNoProv);
