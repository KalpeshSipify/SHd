import React from "react";

// Creating the context
export const VpainputContext = React.createContext({
  VpaInput: {},
  setVpaInput: () => {},
  handleOnTextChange: () => {},
});

// Context Provider component
// eslint-disable-next-line react/prop-types
const VpainputProvider = ({ children }) => {
  // State to hold input data and validation errors
  const [VpaInput, setVpaInput] = React.useState({
    Vpa: "",
  });

  // Function to handle text changes with validation
  const handleOnTextChange = React.useCallback(
    ({ target: { name, value } }) => {
      setVpaInput((prevInputData) => ({
        ...prevInputData,
        [name]: value,
      }));
    },
    []
  );

  // Memoizing context provider value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      VpaInput,
      setVpaInput,
      handleOnTextChange,
    }),
    [VpaInput, setVpaInput, handleOnTextChange]
  );

  // Providing context value to children
  return (
    <VpainputContext.Provider value={value}>
      {children}
    </VpainputContext.Provider>
  );
};

// Memoizing the InputProvider component to avoid unwanted re-renders
export const MemoizedAppVpainputProvider = React.memo(VpainputProvider);
