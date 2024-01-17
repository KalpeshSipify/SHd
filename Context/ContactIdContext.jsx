/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

// Creating the context
export const ContactIdContext = React.createContext({
  ContactID: null,
  setContactID: () => {},
});

// Context Provider component

const contactIdProv = ({ children }) => {
  // State for to hold email responses
  const [ContactID, setContactID] = React.useState(null);

  // Memoizing context provider value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      ContactID,
      setContactID,
    }),
    [ContactID, setContactID]
  );

  // Providing context value to children
  return (
    <ContactIdContext.Provider value={value}>
      {children}
    </ContactIdContext.Provider>
  );
};

// Memoizing the InputProvider component to avoid unwanted re-renders
export const MemoizedContactIdProvider = React.memo(contactIdProv);
