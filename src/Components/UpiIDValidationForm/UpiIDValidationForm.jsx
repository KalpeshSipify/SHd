/* eslint-disable react/prop-types */
import React from "react";
import Spinner from "../Spinner/Spinner";
import InputValidationHoc from "../Hoc/InputValidationHoc";
import { VpainputContext } from "../../../Context/VpainputContext";
import { ContactIdContext } from "../../../Context/ContactIdContext";
import { AddFundAccountVpaPostService } from "../../../ApiGateWaySerice/AddFundAccountVpa";
import { useNavigate } from "react-router-dom";
import { FundAccountValidationPostService } from "../../../ApiGateWaySerice/FundAccountValidation";
import { VerifyAccountNoContext } from "../../../Context/VerifyAccountNoContext";
import { FundAccountValidationIDContext } from "../../../Context/FundAccountValidationIDContext";
import { TokenContext } from "../../../Context/TokenContext";

// eslint-disable-next-line react-refresh/only-export-components, react/prop-types
const UpiIDValidationForm = ({ VpaInputErrors, HandleInputVpa }) => {
  // Hook for navigation
  const navigate = useNavigate();

  // State for spinner loader
  const [Loader, setLoader] = React.useState(false);

  // Context for handling VPA input
  const {
    handleOnTextChange, // Function for handling text input changes
    VpaInput, // State for VPA input
    setVpaInput, // Function to update VPA input state
    VpaInput: { Vpa }, // Destructured VPA from VpaInput
  } = React.useContext(VpainputContext); // Accessing VPA input context

  // Context for accessing the user's contact ID
  const { ContactID } = React.useContext(ContactIdContext);

  // Context for accessing the Verify Account Number
  const { VerifyAccountNo } = React.useContext(VerifyAccountNoContext);

  // Context for accessing the set function to update Fund Account Validation ID
  const { setFAV_ID } = React.useContext(FundAccountValidationIDContext);

  //  context for  accessig the auth token and api key for token conteext
  const { Token, ApiKey } = React.useContext(TokenContext);

  // Constant for navigation delay
  const HANDLE_Navigate_DELAY = 1500;

  /**
   * HandleSubmit function handles the submission of VPA (Virtual Payment Address) data.
   * It performs input validation, sends data to the add VPA API, and subsequently validates the account.
   * Upon successful validation, it navigates to the account validation page with a delay.
   */
  // useCallback for HandleSubmit function
  const handleSubmit = React.useCallback(async () => {
    // Check if input has valid data
    if (HandleInputVpa(VpaInput)) {
      setLoader(true);

      try {
        // Send data to request body for add VPA API
        const sendData = {
          contact_id: ContactID,
          account_type: "vpa",
          vpa: {
            address: Vpa,
          },
        };

        // Calling Add VPA API
        const {
          Data: {
            data: {
              data: {
                user: { id: FA_ID },
              },
            },
          },
        } = await AddFundAccountVpaPostService(sendData, Token, ApiKey);

        // Send data to request body for account validation API
        const ValidationDataSend = {
          account_number: VerifyAccountNo,
          fund_account: {
            id: FA_ID,
          },
        };

        // Calling Validation API
        const {
          Data: {
            data: {
              data: {
                user: { id: FAV_ID },
              },
            },
          },
        } = await FundAccountValidationPostService(
          ValidationDataSend,
          Token,
          ApiKey
        );

        setFAV_ID(FAV_ID); // Setting the Fund Account validation id to state for another API calling get fund account by id
        // Set the input field to empty
        const emptyState = { Vpa: "" };

        // Set a timeout to execute code after a delay
        setTimeout(() => {
          setLoader(false); // Setting loader to false
          navigate("/User/Dashboard/Add_Fund_Acccount"); // Navigate to the account validation page form
          setVpaInput(emptyState); // Update the state with the empty object
        }, HANDLE_Navigate_DELAY);
      } catch (error) {
        setLoader(false); // Set loader to false
        console.log(error.message);
      }
    }
  }, [
    HandleInputVpa,
    VpaInput,
    ContactID,
    Vpa,
    Token,
    ApiKey,
    VerifyAccountNo,
    setFAV_ID,
    navigate,
    setVpaInput,
  ]);
  return (
    <>
      {/* Loader component */}
      {Loader && (
        /* Loader overlay */
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-40">
          <Spinner />{" "}
          {/* Assuming Spinner is a component showing a loading indicator */}
        </div>
      )}

      {/* UPI Fund Account Form */}
      <div className="w-full sm:w-1/3 bg-white bg-opacity-30 rounded-lg p-12 shadow-md flex flex-col">
        <h2 className="font-sans text-2xl mb-4 text-center">
          Fund account VPA
        </h2>

        {/* VPA (Virtual Payment Address) */}
        <div className="flex flex-col mb-4 mt-6">
          <label
            htmlFor="vpa"
            className="mb-1 font-small text-gray-400 text-sm"
          >
            VPA (Virtual Payment Address)
          </label>
          <input
            value={Vpa}
            name="Vpa"
            onChange={handleOnTextChange}
            type="text"
            id="vpa"
            className="w-full h-10 border-2 border-indigo-700 rounded px-4 focus:outline-none text-sm"
          />
          <div className="text-red-500 text-xs">
            {/* Display VPA input errors */}
            {VpaInputErrors.Vpa && <p>{VpaInputErrors.Vpa}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-800 text-white py-3 rounded-lg hover:bg-indigo-800 focus:outline-none mt-10"
        >
          Next
        </button>
      </div>
    </>
  );
};

const MemoizedUpiIDValidationForm = React.memo(
  InputValidationHoc(UpiIDValidationForm)
);
export default MemoizedUpiIDValidationForm;
