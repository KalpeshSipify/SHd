/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React from "react";
import { AppUpiFundFormDataContext } from "../../../Context/AppUpiFundFormDataContext";
import Spinner from "../Spinner/Spinner";
import InputValidationHoc from "../Hoc/InputValidationHoc";
import { FundAccountValidationIDContext } from "../../../Context/FundAccountValidationIDContext";
import { GetFundAccountValidationGetService } from "../../../ApiGateWaySerice/GetFundAccountValidation";
import { ContactIdContext } from "../../../Context/ContactIdContext";
import { CognitoUserIdContext } from "../../../Context/CognitoUserIdContext";
import { SaveFundAccountPostService } from "../../../ApiGateWaySerice/SaveFundAccount";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../../Context/TokenContext";

// eslint-disable-next-line react-refresh/only-export-components, react/prop-types
const UpiFundForm = ({ upiFundAccountInputErrors, HandleInputUpi }) => {
  // Hook for navigation
  const navigate = useNavigate();

  // State for spinner loader
  const [Loader, setLoader] = React.useState(false);

  // State for triggering a re-fetch in the GetFundAccountHandler
  const [callAgain, setcallAgain] = React.useState(false);

  // Context for handling UPI fund account form data
  const {
    handleOnTextChange, // Function for handling text input changes
    UpiFundFrominputData: { AccountName, Vpa, Default }, // Destructuring UPI fund account input data
    UpiFundFrominputData, // Complete UPI fund account input data
    setUpiFundFrominputData, // Function for updating UPI fund account input data
  } = React.useContext(AppUpiFundFormDataContext); // Accessing the AppUpiFundFormDataContext

  // Context for accessing the Fund Account Validation ID and function set fav id
  const { FAV_ID, setFAV_ID } = React.useContext(
    FundAccountValidationIDContext
  );

  // Context for accessing the user's contact ID
  const { ContactID } = React.useContext(ContactIdContext);

  // Context for accessing the Cognito user ID
  const { cognitoUserId } = React.useContext(CognitoUserIdContext);

  //  context for  accessig the auth token and api key for token conteext
  const { Token, ApiKey } = React.useContext(TokenContext);

  // Memoized handler function to prevent unnecessary re-renders
  const getFundAccountHandler = React.useCallback(async () => {
    try {
      setLoader(true); // Set loader to true, indicating the start of an asynchronous operation

      // Calling memoized API function to get fund account details
      const {
        Data: {
          data: {
            data: {
              user: {
                fund_account: {
                  id: FundAccountId,
                  vpa: { address },
                },
                results: { registered_name },
              },
            },
          },
        },
      } = await GetFundAccountValidationGetService(FAV_ID, Token, ApiKey);

      // Check if address or registered name is null, and call the API again if necessary
      if (!address || !registered_name) {
        setcallAgain((prevCallAgain) => !prevCallAgain); // Set state to trigger API call again
      } else if (address && registered_name) {
        // If address and registered name have values, update the state with the received data
        setUpiFundFrominputData((prev) => ({
          ...prev,
          AccountName: registered_name,
          Vpa: address,
          UserProfileConatactID: ContactID,
          FundAccountId,
          UserId: cognitoUserId,
        }));
      }
    } catch (error) {
      // Handle errors that may occur during the API call
      console.error("Error in GetFundAccountHandler:", error);
    } finally {
      setLoader(false); // Set loader back to false, indicating the end of the asynchronous operation
    }
  }, [FAV_ID, ContactID, cognitoUserId, GetFundAccountValidationGetService]);

  // useEffect to call the handler on component mount or when dependencies change
  React.useEffect(() => {
    getFundAccountHandler();
  }, [callAgain]);

  const HANDLE_Navigate_DELAY = 1500; // delay for navigation

  // useCallback to memoize HandleSubmit function
  const SubmitHandler = React.useCallback(async () => {
    // check if input has valid data
    if (HandleInputUpi(UpiFundFrominputData)) {
      setLoader(true);
      try {
        // calling Save Form Data to db handler
        await SaveFundAccountPostService(UpiFundFrominputData, Token, ApiKey);
        // successfully add data to db
        const emptyState = {
          AccountName: "",
          Vpa: "",
          Default: "",
          UserId: "",
        };

        // Set a timeout to execute code after a delay
        setTimeout(() => {
          setFAV_ID(null); // setting the fav id ot null

          setLoader(false); // Setting loader to false

          navigate("/User/Dashboard/UpiID_Validation"); // Navigate to the account validation page form

          setUpiFundFrominputData(emptyState); // Update the state with the empty object
        }, HANDLE_Navigate_DELAY);
        // Update the state with the empty object
      } catch (error) {
        setLoader(false); // setting loader false
        console.log(error);
      }
    }
  }, [UpiFundFrominputData]); // Dependency array includes upiFundFrominputData
  return (
    <>
      {/* Loader component */}
      {Loader && (
        /* Loader overlay */
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-40">
          <Spinner />
          {/* Assuming Spinner is a component showing a loading indicator */}
        </div>
      )}

      {/* UPI Fund Account Form */}
      <div className="w-full sm:w-1/3 bg-white bg-opacity-30 rounded-lg p-12 shadow-md flex flex-col">
        <h2 className="font-sans text-2xl mb-4 text-center">
          Add Fund Account
        </h2>

        {/* Account Name */}
        <div className="flex flex-col mb-4 mt-7">
          <label
            htmlFor="accountName"
            className="mb-1 font-small text-gray-400 text-sm"
          >
            Account Name
          </label>
          <input
            readOnly
            value={AccountName}
            name="AccountName"
            onChange={handleOnTextChange}
            type="text"
            id="accountName"
            className="w-full h-10 border-2 border-indigo-700 rounded px-4 focus:outline-none text-sm"
          />
        </div>

        {/* VPA (Virtual Payment Address) */}
        <div className="flex flex-col mb-4 mt-6">
          <label
            htmlFor="vpa"
            className="mb-1 font-small text-gray-400 text-sm"
          >
            VPA (Virtual Payment Address)
          </label>
          <input
            readOnly
            value={Vpa}
            name="Vpa"
            onChange={handleOnTextChange}
            type="text"
            id="vpa"
            className="w-full h-10 border-2 border-indigo-700 rounded px-4 focus:outline-none text-sm"
          />
        </div>

        {/* Make Default Dropdown */}
        <div className="flex flex-col mb-4 mt-6">
          <label
            htmlFor="makeDefault"
            className="mb-1 font-small text-gray-400 text-sm"
          >
            Make this default
          </label>
          <select
            value={Default}
            name="Default"
            onChange={handleOnTextChange}
            id="makeDefault"
            className="h-10 border-2 border-indigo-700 rounded px-4 focus:outline-none text-sm"
          >
            <option value="">Select....</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
          <div className="text-red-500 text-xs">
            {/* Display Default dropdown errors */}
            {upiFundAccountInputErrors.Default && (
              <p>{upiFundAccountInputErrors.Default}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={SubmitHandler}
          className="w-full bg-indigo-800 text-white py-3 rounded-lg hover:bg-indigo-800 focus:outline-none mt-10"
        >
          Add Account
        </button>
      </div>
    </>
  );
};

const MemoizedUpiFundForm = React.memo(InputValidationHoc(UpiFundForm));
export default MemoizedUpiFundForm;
