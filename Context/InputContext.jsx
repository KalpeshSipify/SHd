/**
 * The code defines a React context and a context provider component for handling input data and
 * validation errors in a form.
 * @returns The code is returning the InputProvider component, which is a context provider component.
 * It wraps the children components and provides the input data, input data setter, text change
 * handler, and validation errors through the InputContext.
 */
import React from "react";

// Creating the context
export const InputContext = React.createContext({
  inputData: {},
  setInputData: () => {},
  handleOnTextChange: () => {},
  validationErrors: {},
});

// Context Provider component
const InputProvider = ({ children }) => {
  // State to hold input data and validation errors
  const [inputData, setInputData] = React.useState({
    email: "",
    answer: "",
  });

  const [validationErrors, setValidationErrors] = React.useState({});

  // Function to validate email format
  const validateEmail = (email) => {
    // Basic email regex for format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to handle text changes with validation
  const handleOnTextChange = React.useCallback(
    ({ target: { name, value } }) => {
      let errors = { ...validationErrors };

      if (name === "email") {
        if (!value.trim()) {
          errors = { ...errors, email: "Email cannot be empty." };
        } else if (!validateEmail(value)) {
          errors = { ...errors, email: "Please enter a valid email address." };
        } else {
          delete errors.email;
        }
      }

      if (name === "answer") {
        if (!value.trim()) {
          errors = { ...errors, answer: "Otp cannot be empty." };
        } else if (isNaN(value)) {
          errors = { ...errors, answer: "Invalid Opt Formate." };
        } else {
          delete errors.answer;
        }
      }

      setValidationErrors(errors);

      setInputData((prevInputData) => ({
        ...prevInputData,
        [name]: value,
      }));
    },
    [validationErrors]
  );

  // Memoizing context provider value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      inputData,
      setInputData,
      handleOnTextChange,
      validationErrors,
    }),
    [inputData, setInputData, handleOnTextChange, validationErrors]
  );

  // Providing context value to children
  return (
    <InputContext.Provider value={value}>{children}</InputContext.Provider>
  );
};

// Memoizing the InputProvider component to avoid unwanted re-renders
export const MemoizedInputProvider = React.memo(InputProvider);
