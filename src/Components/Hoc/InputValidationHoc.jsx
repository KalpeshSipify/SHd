/**
 * The above code is a JavaScript React component that provides input validation for a form.
 * @returns The code is returning a Higher Order Component (HOC) called `InputValidationHoc`.
 */
import React from "react";
// Function to validate input fields
const validateInputs = (data) => {
  const errors = {};

  // Validation for Default: Should not be empty
  if (!data.Default) {
    errors.Default = "Default value is required.";
  }

  return errors;
};

// Function to validate input fields
const validateInputsVpa = (data) => {
  const errors = {};

  // Validation for Vpa: Should not be empty and should match a specific pattern (adjust pattern as needed)
  if (!data.Vpa) {
    errors.Vpa = "VPA is required.";
  } else if (!/^[a-zA-Z0-9.@_-]{5,}$/i.test(data.Vpa)) {
    errors.Vpa = "Invalid VPA format.";
  }

  return errors;
};

// Higher Order Component (HOC) for input validation
const InputValidationHoc = (ReuseComponent) => {
  const ReusableInputValidation = (props) => {
    const [upiFundAccountInputErrors, setupiFundAccountInputErrors] =
      React.useState({});

    // Handler function to perform input validations
    const HandleInputUpi = (UpiFundFrominputData) => {
      // Validate input fields
      const errors = validateInputs(UpiFundFrominputData);

      // Update the state with validation errors
      setupiFundAccountInputErrors(errors);

      // Return whether the form is valid based on the errors object
      return Object.keys(errors).length === 0;
    };

    // state
    const [VpaInputErrors, setVpaInputErrors] = React.useState({});
    // Handler function to perform input validations
    const HandleInputVpa = (VpaInput) => {
      // Validate input fields
      const errors = validateInputsVpa(VpaInput);

      // Update the state with validation errors
      setVpaInputErrors(errors);

      // Return whether the form is valid based on the errors object
      return Object.keys(errors).length === 0;
    };

    return (
      <ReuseComponent
        {...props}
        upiFundAccountInputErrors={upiFundAccountInputErrors}
        HandleInputUpi={HandleInputUpi}
        HandleInputVpa={HandleInputVpa}
        VpaInputErrors={VpaInputErrors}
      />
    );
  };

  return React.memo(ReusableInputValidation);
};

export default InputValidationHoc;
