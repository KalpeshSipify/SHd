/* eslint-disable react/prop-types */
import React from "react";
import { MakeItDefaultAccountPostService } from "../../../ApiGateWaySerice/MakeItDefaultAccount";
import { TokenContext } from "../../../Context/TokenContext";
import { FunAccountApiReCallContext } from "../../../Context/FunAccountApiReCallContext";
import MemoizedSpinner from "../Spinner/Spinner";

const List = ({
  item: { AccountName, Vpa, DefaultAccount, ContactID, id },
}) => {
  // State for spinner loader
  const [Loader, setLoader] = React.useState(false);

  // Context for accessing the auth token and API key
  const { ApiKey, Token } = React.useContext(TokenContext);

  // Context for accessing the FundApi Recall State
  const { setFundApireCall } = React.useContext(FunAccountApiReCallContext);

  // Handler function to make the current account default
  const handleMakeDefault = async () => {
    try {
      // Prepare data to be sent in the request
      const sendData = {
        ContactID,
        id,
      };
      // set the loader to True
      setLoader(true);
      // Call the service to make the account default
      await MakeItDefaultAccountPostService(sendData, Token, ApiKey);

      // Toggle the recall flag to trigger a re-fetch of fund account data
      setFundApireCall((prev) => !prev);
    } catch (error) {
      // set the loader to False
      setLoader(false);
      // Handle any errors that occur during the process
      console.error("Error:", error);
    } finally {
      // set the loader to False
      setLoader(false);
    }
  };
  return (
    <>
      {/* Loader component */}
      {Loader && (
        /* Loader overlay */
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-40">
          <MemoizedSpinner />
          {/* Assuming Spinner is a component showing a loading indicator */}
        </div>
      )}

      <tbody className="bg-white">
        <tr>
          <td className="py-4 px-6 border-b border-gray-200">{AccountName}</td>
          <td className="py-4 px-6 border-b border-gray-200 truncate flex items-center">
            <span>{Vpa}</span>
          </td>
          <td className="py-4 px-6 border-b border-gray-200 ">
            <span
              className={`bg-${
                DefaultAccount === "yes" ? "green-500" : "red-500"
              } text-white py-1 px-2 rounded-full text-xs`}
            >
              {DefaultAccount}
            </span>
            {DefaultAccount !== "yes" && (
              <button
                className="ml-2 bg-indigo-600 text-white py-1 px-2 rounded-full text-xs"
                onClick={handleMakeDefault} // Add a function to handle making it default
              >
                Make Default
              </button>
            )}
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default List;
